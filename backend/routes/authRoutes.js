const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, 'SECRET_KEY', { expiresIn: '1h' });

        res.json({
            token,
            username: user.username,
            userId: user._id  // Sending userId in the response
        });

    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});



module.exports = router;
