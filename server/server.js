const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/database');
const routes = require('./controllers');
const cors = require('cors');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//for now
const mongoURI = `${process.env.MONGO_URI}`;

console.log(mongoURI);
app.use(express.json());
//expose static assets
//this is only required for local set up
console.log(path.join(__dirname, 'uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session 
app.use(session({
    secret: process.env.SESSION_SECRET || 'super secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: mongoURI,
    }),
}));

const startServer = async () => {
    try {
        await connectDB();
        app.use(routes);
        app.get('/', (req, res) => {
            res.send('Server is running');
        });
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();
