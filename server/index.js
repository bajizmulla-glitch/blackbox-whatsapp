const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ১. ডাটাবেজ কানেকশন (Vercel-এর MONGO_URI থেকে আসবে)
const mongoURI = process.env.MONGO_URI; 

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB Connected successfully!'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// ২. ইউজার মডেল (User Schema)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// ৩. রেজিস্ট্রেশন রাউট (Registration Route)
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // পাসওয়ার্ড এনক্রিপ্ট করা (Security)
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed! User might already exist." });
  }
});

// ৪. লগইন রাউট (Login Route)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials!" });

    res.status(200).json({ message: "Login successful!", user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ error: "Login error!" });
  }
});

// ৫. সার্ভার টেস্ট রাউট
app.get('/', (req, res) => {
  res.send('Blackbox WhatsApp Server is Running...');
});

// ৬. পোর্ট ৩০০১
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is flying on port ${PORT}`);
});