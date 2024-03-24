const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

router.post('/submit', async (req, res) => {
    try {
        const { message } = req.body;
        const feedback = new Feedback({ user: req.userId, message });
        await feedback.save();

        req.app.io.emit('newFeedback', feedback);

        res.status(201).json(feedback);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});



router.get('/all', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/admin-message', async (req, res) => {
    try {
        const { userId, message } = req.body;
        const feedback = new Feedback({ user: userId, message });
        await feedback.save();

        req.app.io.emit('adminMessage', feedback);

        res.status(201).json(feedback);
    } catch (error) {
        console.error('Admin message submission failed:', error.response ? error.response.data : error.message);
    }
    
});



module.exports = router;
