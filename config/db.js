const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from the environment variables
    await mongoose.connect(process.env.MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });

    console.log('MongoDB Connected'); // Connection success message
  } catch (err) {
    console.error('Connection error: ', err.message); // More descriptive error message
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

