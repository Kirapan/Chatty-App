// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
let counter = 0;
wss.on('connection', (ws) => {
  console.log("connected");
  const usersQty = {
    type: "userQty",
    qty: wss.clients.size
  }
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(usersQty))
  })
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        const newMess = JSON.parse(message);
        newMess.id = uuidv1();
        if (newMess.type === "postMessage") {
          newMess.type = "incomingMessage"
        } else {
          newMess.type = "incomingNotification"
        }
        client.send(JSON.stringify(newMess));
      }
    });
  })
  //ws.send(JSON.stringify({content: 'Welcome', username: 'God', id: 3}))

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});