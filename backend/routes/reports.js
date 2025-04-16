
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const { authenticateToken } = require('./auth');
require('dotenv').config();

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

// Get scheduled reports
router.get('/scheduled', authenticateToken, async (req, res) => {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const db = client.db('facialRecognition');
    const reportsCollection = db.collection('scheduledReports');
    
    const reports = await reportsCollection.find({}).toArray();
    
    await client.close();
    
    res.json(reports);
  } catch (err) {
    console.error('Get scheduled reports error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update scheduled report
router.post('/scheduled', authenticateToken, async (req, res) => {
  try {
    const { id, title, frequency, day, time, recipients, format, active } = req.body;
    
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const db = client.db('facialRecognition');
    const reportsCollection = db.collection('scheduledReports');
    
    // Update existing or create new
    if (id) {
      await reportsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { title, frequency, day, time, recipients, format, active, updatedAt: new Date() } }
      );
    } else {
      await reportsCollection.insertOne({
        title,
        frequency,
        day,
        time,
        recipients,
        format,
        active,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    await client.close();
    
    res.json({ message: 'Report schedule saved successfully' });
  } catch (err) {
    console.error('Save scheduled report error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate adhoc report
router.post('/generate', authenticateToken, async (req, res) => {
  try {
    const { reportType, dateRange } = req.body;
    
    // In a real implementation, this would actually generate a report
    // For now, we'll just return a success message
    
    res.json({
      message: 'Report generated successfully',
      downloadUrl: `/reports/${reportType}_${Date.now()}.pdf`
    });
  } catch (err) {
    console.error('Generate report error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
