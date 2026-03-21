const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI; 

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.error("DB Connection Error:", err));

// ইউজার মডেল
const User = mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}));

// সাইনআপ API রুট
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) return res.status(400).json({ message: "ইমেইলটি আগে থেকেই আছে।" });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Success", success: true });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// লগইন API রুট (এটি আপনার আগের কোডে ছিল না, তাই যোগ করে দিলাম)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "ইমেইল বা পাসওয়ার্ড ভুল!" });
    }

    res.status(200).json({ 
      success: true, 
      user: { name: user.name, email: user.email } 
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server live on port ${PORT}`));

module.exports = app;