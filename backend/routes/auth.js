
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

const router = express.Router();

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  console.log(`Login attempt for user: ${username}`);
  
  try {
    console.log('Connecting to MongoDB Atlas...');
    console.log(`Connection URI: ${mongoURI.substring(0, 20)}...`);
    
    const client = new MongoClient(mongoURI);
    await client.connect();
    console.log('Connected to MongoDB Atlas successfully!');
    
    const db = client.db('facialRecognition');
    const usersCollection = db.collection('users');
    
    // Find user by username
    const user = await usersCollection.findOne({ username });
    
    console.log(`User lookup result: ${user ? 'Found' : 'Not found'}`);
    
    if (!user) {
      console.log(`User not found: ${username}`);
      await client.close();
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    console.log(`Password verification result: ${isMatch ? 'Match' : 'No match'}`);
    
    if (!isMatch) {
      console.log(`Invalid password for user: ${username}`);
      await client.close();
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    console.log(`Login successful for user: ${username}`);
    
    // Create JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Update last login time
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    );
    
    await client.close();
    
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error details:', err);
    res.status(500).json({ message: 'Server error', details: err.message });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Get current user route
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const db = client.db('facialRecognition');
    const usersCollection = db.collection('users');
    
    const user = await usersCollection.findOne({ _id: new ObjectId(req.user.id) });
    
    if (!user) {
      await client.close();
      return res.status(404).json({ message: 'User not found' });
    }
    
    await client.close();
    
    res.json({
      id: user._id,
      username: user.username,
      role: user.role,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error('Get current user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fix the exports to make sure both router and authenticateToken are correctly exported
export { router, authenticateToken };
