const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // অনলাইনে সব জায়গা থেকে এক্সেস করার জন্য
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// --- ১. MongoDB কানেকশন সেটআপ ---
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Database Connected!'))
  .catch((err) => console.error('❌ DB Connection Error:', err));

// --- ২. ইউজার মডেল (Schema) তৈরি ---
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// --- ৩. API রুটস (Signup & Login) ---

// সাইন-আপ রুট
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'সবগুলো ঘর পূরণ করুন' });
    }

    // ইমেইল আগে আছে কি না চেক করা
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'এই ইমেইলটি আগে থেকেই রেজিস্টার্ড' });
    }

    // নতুন ইউজার ডাটাবেজে সেভ করা
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({ success: true, message: 'অ্যাকাউন্ট তৈরি হয়েছে! ডাটাবেজে সেভ হয়েছে।' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ success: false, error: 'সার্ভারে সমস্যা হয়েছে' });
  }
});

// লগইন রুট
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ success: false, error: 'ভুল ইমেইল বা পাসওয়ার্ড' });
    }

    res.json({ success: true, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'লগইন করতে সমস্যা হচ্ছে' });
  }
});

// --- ৪. Socket.io (চ্যাটিং সিস্টেম) ---
io.on('connection', (socket) => {
  console.log(`🔌 Connected: ${socket.id}`);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined ${roomId}`);
    socket.emit('joined_room', roomId);
  });

  socket.on('send_message', (data) => {
    // রুমে থাকা সবাইকে মেসেজ পাঠানো
    io.to(data.roomId).emit('receive_message', data);
  });

  socket.on('typing', (data) => {
    socket.to(data.roomId).emit('typing_update', data);
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Disconnected: ${socket.id}`);
  });
});

// --- ৫. সার্ভার পোর্ট ---
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});