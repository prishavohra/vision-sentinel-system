
import express from 'express';
import { MongoClient } from 'mongodb';
import { authenticateToken } from './auth.js';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

const router = express.Router();

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

// Get system settings
router.get('/', authenticateToken, async (req, res) => {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const db = client.db('facialRecognition');
    const settingsCollection = db.collection('systemSettings');
    
    // Get settings or create default if not exists
    let settings = await settingsCollection.findOne({ type: 'system' });
    
    if (!settings) {
      settings = {
        type: 'system',
        general: {
          systemName: 'EyeSpy Surveillance System'
        },
        security: {
          apiKey: Math.random().toString(36).substring(2, 15),
          twoFactorEnabled: false
        },
        alerts: {
          emailNotifications: '',
          alertCategories: {
            restrictedPerson: true,
            unknownPerson: true,
            systemErrors: true
          }
        }
      };
      
      await settingsCollection.insertOne(settings);
    }
    
    await client.close();
    
    res.json(settings);
  } catch (err) {
    console.error('Get settings error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update system settings
router.post('/', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'Administrator') {
      return res.status(403).json({ message: 'Access denied. Not an administrator.' });
    }
    
    const { section, settings } = req.body;
    
    if (!section || !settings) {
      return res.status(400).json({ message: 'Section and settings are required' });
    }
    
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const db = client.db('facialRecognition');
    const settingsCollection = db.collection('systemSettings');
    
    // Update only the specified section
    const updateQuery = {};
    updateQuery[section] = settings;
    
    await settingsCollection.updateOne(
      { type: 'system' },
      { $set: updateQuery },
      { upsert: true }
    );
    
    await client.close();
    
    res.json({ message: 'Settings updated successfully' });
  } catch (err) {
    console.error('Update settings error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Regenerate API key
router.post('/regenerate-api-key', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'Administrator') {
      return res.status(403).json({ message: 'Access denied. Not an administrator.' });
    }
    
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const db = client.db('facialRecognition');
    const settingsCollection = db.collection('systemSettings');
    
    // Generate new API key
    const newApiKey = Math.random().toString(36).substring(2, 15);
    
    await settingsCollection.updateOne(
      { type: 'system' },
      { $set: { 'security.apiKey': newApiKey } },
      { upsert: true }
    );
    
    await client.close();
    
    res.json({ 
      message: 'API key regenerated successfully',
      apiKey: newApiKey
    });
  } catch (err) {
    console.error('Regenerate API key error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
