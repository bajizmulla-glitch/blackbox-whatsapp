const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ডাটাবেজ কানেকশন (Vercel-এ দেওয়া MONGO_URI ব্যবহার করবে)
const mongoURI = process.env.MONGO_URI; 

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB Connected successfully!'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// বেসিক টেস্ট রাউট (এটি চেক করার জন্য যে সার্ভার কাজ করছে কি না)
app.get('/', (req, res) => {
  res.send('Blackbox Server is running and Database is connecting...');
});

// আপনার রেজিস্ট্রেশন বা অন্যান্য রাউটগুলো এর নিচে থাকবে...

// আপনার কাঙ্ক্ষিত পোর্ট ৩০০১
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is flying on port ${PORT}`);
});