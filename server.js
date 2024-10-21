const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const authRoutes = require('./routes/authRoutes');
const auctionRoutes = require('./routes/auctionRoutes');
const connectDB = require('./config/db');

// Initialize app
dotenv.config();
const app = express();

// CORS configuration
const corsOptions = {
    origin: 'https://bidding-app-client.vercel.app', // Update with your frontend URL
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'], // Include 'x-auth-token'
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON body
app.use(bodyParser.json());  // You can remove this if you use express.json()
app.use(express.json()); // This middleware is sufficient for parsing JSON

// Handle preflight requests
app.options('*', cors(corsOptions));

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
