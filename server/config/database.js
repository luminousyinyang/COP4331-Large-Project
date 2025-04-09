// config/database.js
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB || ''}?retryWrites=true&w=majority&appName=${process.env.MONGO_APP_NAME}`;

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
