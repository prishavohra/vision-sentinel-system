
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { MongoClient, ObjectId } = require('mongodb');
const { authenticateToken } = require('./auth');
require('dotenv').config();

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

// Get all users
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'Administrator') {
      return res.status(403).json({ message: 'Access denied. Not an administrator.' });
    }
    
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const db = client.db('facialRecognition');
    const usersCollection = db.collection('users');
    
    const users = await usersCollection.find({}).toArray();
    
    await client.close();
    
    // Remove passwords from response
    const safeUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
      lastLogin: user.lastLogin || 'Never'
    }));
    
    res.json(safeUsers);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new user
router.post('/', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'Administrator') {
      return res.status(403).json({ message: 'Access denied. Not an administrator.' });
    }
    
    const { name, username, email, password, role, status } = req.body;
    
    // Validate input
    if (!name || !username || !email || !password || !role || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const db = client.db('facialRecognition');
    const usersCollection = db.collection('users');
    
    // Check if username already exists
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      await client.close();
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUser = {
      name,
      username,
      email,
      password: hashedPassword,
      role,
      status,
      createdAt: new Date(),
      lastLogin: null
    };
    
    const result = await usersCollection.insertOne(newUser);
    
    await client.close();
    
    res.status(201).json({
      id: result.insertedId,
      name,
      username,
      email,
      role,
      status
    });
  } catch (err) {
    console.error('Create user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'Administrator') {
      return res.status(403).json({ message: 'Access denied. Not an administrator.' });
    }
    
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const db = client.db('facialRecognition');
    const usersCollection = db.collection('users');
    
    // Check if user exists
    const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!user) {
      await client.close();
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete user
    await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    
    await client.close();
    
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
