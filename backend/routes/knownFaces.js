
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { authenticateToken } from './auth.js';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

const router = express.Router();

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

// Get all known faces
router.get('/', async (req, res) => {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const db = client.db('facialRecognition');
    const knownFacesCollection = db.collection('knownFaces');
    
    const knownFaces = await knownFacesCollection.find({}).toArray();
    
    await client.close();
    
    res.json(knownFaces);
  } catch (err) {
    console.error('Get known faces error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new known face
router.post('/', async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    
    // Validate input
    if (!name || !imageUrl) {
      return res.status(400).json({ message: 'Name and image URL are required' });
    }
    
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const db = client.db('facialRecognition');
    const knownFacesCollection = db.collection('knownFaces');
    
    const newFace = {
      name,
      imageUrl,
      dateAdded: new Date(),
      lastSeen: null
    };
    
    const result = await knownFacesCollection.insertOne(newFace);
    
    await client.close();
    
    res.status(201).json({
      id: result.insertedId,
      ...newFace
    });
  } catch (err) {
    console.error('Add known face error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a known face
router.delete('/:id', async (req, res) => {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const db = client.db('facialRecognition');
    const knownFacesCollection = db.collection('knownFaces');
    
    // Delete face
    await knownFacesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    
    await client.close();
    
    res.json({ message: 'Face deleted successfully' });
  } catch (err) {
    console.error('Delete face error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a known face
router.patch('/:id', async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const db = client.db('facialRecognition');
    const knownFacesCollection = db.collection('knownFaces');
    
    const updates = {};
    if (name) updates.name = name;
    if (imageUrl) updates.imageUrl = imageUrl;
    
    // Update face
    await knownFacesCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updates }
    );
    
    await client.close();
    
    res.json({ message: 'Face updated successfully' });
  } catch (err) {
    console.error('Update face error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
