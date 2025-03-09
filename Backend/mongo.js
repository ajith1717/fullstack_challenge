// Import mongoose
const mongoose = require("mongoose");
require('dotenv').config();

// Get MongoDB connection string from environment variables
const mongoDbConString = process.env.MONGO_URI;
console.log("MongoDB Connection String: ", mongoDbConString);

// Create a MongoDB connection
var mongoDbConn = mongoose.createConnection(mongoDbConString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 20000,
});

// Add event listeners to log connection status
mongoDbConn.on('connected', () => {
    console.log("MongoDB connected successfully!");
});

mongoDbConn.on('error', (err) => {
    console.error("Error connecting to MongoDB:", err);
});

mongoDbConn.on('disconnected', () => {
    console.log("MongoDB connection disconnected.");
});

module.exports = {
    mongoDbConn
};
