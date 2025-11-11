// Import express and socket.io
const express = require('express')
const app = express()
const socketio = require('socket.io')

// Serve static files from "public" folder (HTML, CSS, JS)
app.use(express.static(__dirname + '/public'))

// Start express server on port 9000
const expressServer = app.listen(9000, () => {
  console.log('Server listening on PORT 9000...');
})

// Attach socket.io to express server
const io = socketio(expressServer)

// When client connects
io.on('connection', (socket) => {
  // Send welcome message to that client
  socket.emit('messageFromServer', { data: "Welcome to the socket.io server" })

  // Listen message from client
  socket.on('messageToServer', (dataFromClient) => {
    console.log(dataFromClient)
  })

  // Listen for chat messages and broadcast to all clients
  socket.on('newMessageToServer', (msg) => {
    io.emit('messageToClients', { text: msg.text })
  })
})
