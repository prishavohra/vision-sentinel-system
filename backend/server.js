
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Import routes
import * as authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import statsRoutes from './routes/stats.js';
import reportRoutes from './routes/reports.js';
import settingsRoutes from './routes/settings.js';
import knownFacesRoutes from './routes/knownFaces.js';

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000', 'https://*.lovableproject.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Initialize database with required collections
async function initializeDatabase() {
  let client;
  try {
    console.log('Connecting to MongoDB Atlas...');
    client = new MongoClient(mongoURI);
    await client.connect();
    console.log('Connected to MongoDB Atlas successfully!');
    
    const db = client.db('facialRecognition');
    
    // Check if admin user exists, if not, create one
    const usersCollection = db.collection('users');
    const adminUser = await usersCollection.findOne({ username: 'admin' });
    
    if (!adminUser) {
      console.log('No admin user found. Creating default admin user...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      await usersCollection.insertOne({
        name: 'Admin User',
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'Administrator',
        status: 'Active',
        createdAt: new Date(),
        lastLogin: null
      });
      
      console.log('Default admin user created successfully');
    } else {
      console.log('Admin user already exists:', adminUser.username);
    }
    
    return client;
  } catch (err) {
    console.error('Database initialization error:', err);
    if (client) {
      await client.close();
    }
    // Rethrow the error to be caught by the caller
    throw err;
  }
}

// Routes - Fix to use the correct auth routes object format
app.use('/api/auth', authRoutes.router); // Use .router from the exported object
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/known-faces', knownFacesRoutes);

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    const client = await initializeDatabase();
    // Keep the connection open for the server lifetime
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Failed to initialize database:', err);
    // Continue running the server even if DB init fails
  }
});
