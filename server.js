// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'your_mongo_uri';

// Middleware
app.use(express.json()); 

// Routes
const entryRoutes = require('./routes/entryRoutes');
app.use('/entries', entryRoutes);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
})
.then(() => {
  console.log('MongoDB connected...');
  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch(err => console.error('Error connecting to MongoDB:', err));
