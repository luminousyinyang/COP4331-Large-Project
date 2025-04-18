// config/database.js
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = `${process.env.MONGO_URI}`;

const testConnection = async () => {
    try {
        await mongoose.connection.db.admin().ping();
        console.log('MongoDB ping successful.');
        return true;
    } catch (err) {
        console.error('MongoDB connection test failed:', err.message);
        return false;
    }
};

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected.');
        const isConnected = await testConnection();
        if (!isConnected) {
            throw new Error('Connection test failed after connecting.');
        }
    } catch (err) {
        console.error('Database error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
