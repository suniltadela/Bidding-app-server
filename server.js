
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware to parse JSON body

// Import routes
const authRoutes = require('./routes/authRoutes');
const auctionRoutes = require('./routes/auctionRoutes');
const connectDB = require('./config/db');

// Initialize app
dotenv.config();
const app = express();
app.use(bodyParser.json());
// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));
connectDB();
// Simple GET request to check if the server is working
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is working!' });
  });
  
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auctions', auctionRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
