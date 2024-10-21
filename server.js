
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
const corsOptions = {
    origin: 'https://bidding-app-client.vercel.app', // Update with your frontend URL
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
// app.use(cors());
app.use(express.json());

// DB Connection
connectDB();
// Simple GET request to check if the server is working
app.get('/', (req, res) => {
    res.send('Server is working!');
  });
  
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auctions', auctionRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
