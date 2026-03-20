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
