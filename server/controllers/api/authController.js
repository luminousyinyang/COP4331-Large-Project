const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Store user ID in session
        req.session.userId = user._id;
        res.json({ message: 'Logged in successfully', userId: req.session.userId });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});


router.post('/register', async (req, res) => {
    const {
        username,
        password,
        firstname,
        lastname,
        x,
        instagram,
        spotify,
        amazon
    } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const user = new User({ username, password, firstname, lastname, x, instagram, spotify, amazon });
        await user.save();

        // Log in immediately after registration\
        req.session.userId = user._id;
        res.status(201).json({ message: 'User registered successfully', userId: req.session.userId });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
