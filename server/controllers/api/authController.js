const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { isAuthenticated } = require('../../middleware/auth');

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
        spotify
    } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const user = new User({ username, password, firstname, lastname, x, instagram, spotify });
        await user.save();

        // Log in immediately after registration\
        req.session.userId = user._id;
        res.status(201).json({ message: 'User registered successfully', userId: req.session.userId });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/profile/:username?', isAuthenticated, async (req, res) => {
    try {
        let user;
        if (req.params.username) {
            user = await User.findOne({username: req.params.username}).select('username firstname lastname bio x instagram spotify ').lean();
        } else {
            const userId = req.session.userId;
            user = await User.findById(userId).select('username firstname lastname bio x instagram spotify ').lean();
        }


        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({
            userId: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            bio: user.bio,
            x: user.x,
            instagram: user.instagram,
            spotify: user.spotify,
        });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
});

router.post('/profile', isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.userId;

        const { username, firstname, lastname, bio, x, instagram, spotify } = req.body;

        const updateFields = {
            ...(username && { username }),
            ...(firstname && { firstname }),
            ...(lastname && { lastname }),
            ...(bio && { bio }),
            ...(x && { x }),
            ...(instagram && { instagram }),
            ...(spotify && { spotify }),
        };

        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({
            message: 'Profile updated successfully',
            userId: updatedUser._id,
            ...updateFields
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;
