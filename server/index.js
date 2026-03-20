const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Mock Google Sheets with users.json
const fs = require('fs');
const path = require('path');
const usersFile = path.join(__dirname, 'users.json');
let users = [];

if (fs.existsSync(usersFile)) {
  try {
    users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  } catch (e) {
    users = [];
  }
}

const saveUsers = () => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;
  console.log('📝 Signup attempt:', { name, email }); // Mock Google Sheets log

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: 'All fields required' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ success: false, error: 'Email already registered' });
  }

  const newUser = { name, email, password }; // Plain PW for demo - use bcrypt in prod
  users.push(newUser);
  saveUsers();

  res.json({ success: true, message: 'Account created! Data sent to Sheets.' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log('🔐 Login attempt:', email);

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).json({ success: false, error: 'Invalid credentials' });
  }

  res.json({ success: true, user: { name: user.name, email: user.email } });
});

io.on('connection', (socket) => {
  console.log(`🔌 Connected: ${socket.id}`);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined ${roomId}`);
    socket.emit('joined_room', roomId);
  });

  socket.on('send_message', (data) => {
    console.log(`💬 [${data.roomId}] ${data.message.substring(0, 20)}`);
    // Broadcast to ALL in room (including sender)
    io.to(data.roomId).emit('receive_message', data);
  });

  socket.on('typing', (data) => {
    socket.to(data.roomId).emit('typing_update', data);
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log('✅ Server running on port 3001 - Ready for WhatsApp clone!');
});
