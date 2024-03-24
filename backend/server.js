// server.js (or wherever your backend server code resides)

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

mongoose.connect('mongodb+srv://nutankumari211:nutan%40123%40@cluster0.pmxpstx.mongodb.net/portal?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    req.app.io = io;
    next();
});
app.use('/api/auth', authRoutes);
app.use('/api/feedback', authMiddleware, feedbackRoutes);

// Socket.io integration
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Listen for new feedback and emit it to all connected clients
  socket.on('newFeedback', (feedback) => {
    io.emit('newFeedback', feedback);
  });
});


const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
