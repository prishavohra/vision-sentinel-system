
import express from 'express';
import { MongoClient } from 'mongodb';
import { authenticateToken } from './auth.js';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

const router = express.Router();

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

// Get dashboard statistics
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const db = client.db('facialRecognition');
    const recognitionsCollection = db.collection('recognitions');
    const alertsCollection = db.collection('alerts');
    
    // Get total recognitions count
    const totalRecognized = await recognitionsCollection.countDocuments();
    
    // Get alerts count
    const alertTriggers = await alertsCollection.countDocuments();
    
    // Calculate system uptime (dummy data for now)
    const systemUptime = 99.8;
    
    // Get recent activity
    const recentRecognitions = await recognitionsCollection.find({})
      .sort({ timestamp: -1 })
      .limit(3)
      .toArray();
      
    const recentAlerts = await alertsCollection.find({})
      .sort({ timestamp: -1 })
      .limit(2)
      .toArray();
    
    // Combine and sort by timestamp
    const recentActivity = [
      ...recentRecognitions.map(rec => ({
        type: 'recognition',
        message: `Person recognized: ${rec.personName}`,
        location: rec.location,
        timestamp: rec.timestamp
      })),
      ...recentAlerts.map(alert => ({
        type: 'alert',
        message: alert.message,
        location: alert.location,
        timestamp: alert.timestamp
      }))
    ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
    
    await client.close();
    
    res.json({
      totalRecognized,
      alertTriggers,
      systemUptime,
      recentActivity
    });
  } catch (err) {
    console.error('Get stats error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
