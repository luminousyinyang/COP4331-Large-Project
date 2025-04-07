const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/database');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3000;

//for now
const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=COP4331`;


app.use(express.json());
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
