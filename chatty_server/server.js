// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');
const querystring = require('querystring');
const fetch = require('node-fetch');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

const colorGenerator = () => '#'+Math.random().toString(16).substr(-6);
// Create the WebSockets server
const wss = new WebSocket.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log("connected");
  const usersQty = {
    type: "userQty",
    qty: wss.clients.size
  }
  const assignColor =colorGenerator();
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(usersQty))
  })
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        const newMess = JSON.parse(message);
        newMess.id = uuidv1();
        newMess.color = assignColor;
        if (newMess.type === "postMessage") {
          const regEX = newMess.content.match(/.*\/giphy\s+(\w.*)$/)
          const regEX2 = newMess.content.match(/https?:\/\/.*\.(gif|png|jpg)$/g)
          if(regEX) {
            const qs = querystring.stringify({
              api_key: 'gV6kziB8t5LWctVa1ZuC9rI8YMkZ4aIo',
              tag:regEX[1]
            })
            const url=`https://api.giphy.com/v1/gifs/random?${qs}`
            fetch (url)
            .then(resp => {
              if(resp.ok) {
                return resp.json();
              }
              throw new Error ("Invalid Format")
            })
            .then(json => {
              newMess.content=`<div><p>${regEX[1]}</p><br/><img class="iamanimage" src="${json.data.image_url}" alt="Your gif"/></div>`
              newMess.type = "incomingMessage"
              client.send(JSON.stringify(newMess));
            })
            .catch(()=> {
              newMess.content="There is an Api error."
              newMess.type = "incomingMessage"
              client.send(JSON.stringify(newMess))
            }) 
          } else if (regEX2) {
              const final=newMess.content.replace(regEX2[0],"").trim();
              newMess.content=`<div><p>${final}</p><br/><img class="iamanimage" src="${regEX2[0]}" alt="Your image"/></div>`
              newMess.type = "incomingMessage"
              client.send(JSON.stringify(newMess));
          } else {
            newMess.type = "incomingMessage"
            client.send(JSON.stringify(newMess));
          }
        } else {
          newMess.type = "incomingNotification"
          client.send(JSON.stringify(newMess));
        }
      }
    });
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});