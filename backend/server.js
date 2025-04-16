
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Import routes
const { router: authRoutes } = require('./routes/auth');
const userRoutes = require('./routes/users');
const statsRoutes = require('./routes/stats');
const reportRoutes = require('./routes/reports');
const settingsRoutes = require('./routes/settings');
const knownFacesRoutes = require('./routes/knownFaces');

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database with required collections
async function initializeDatabase() {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const db = client.db('facialRecognition');
    
    // Check if admin user exists, if not, create one
    const usersCollection = db.collection('users');
    const adminUser = await usersCollection.findOne({ role: 'Administrator' });
    
    if (!adminUser) {
      const bcrypt = require('bcryptjs');
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
      
      console.log('Default admin user created');
    }
    
    await client.close();
    console.log('Database initialized');
  } catch (err) {
    console.error('Database initialization error:', err);
  }
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/known-faces', knownFacesRoutes);

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initializeDatabase();
});
