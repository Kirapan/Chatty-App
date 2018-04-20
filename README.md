Chatty App
=====================

Chatty is a web application with real-time functionality that allow users to communicate with each other without having to register accounts. It utilizes React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

## Getting Started

npm install
npm start
open http://localhost:3000

## Dependencies

# Client-Side

- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- css-loader
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server
- react
- react-dom

# WebSocket Server-Side

- express
- ws
- node-fetch
- querystring
- uuid

## Screenshots

!["Screenshot of chatty messages](https://github.com/Kirapan/Chatty-App/blob/master/docs/App_screen_shot.png)

## Technical Specifications

# Stack

Webpack with Babel, JSX, ES6, webpack dev server (comes with boilerplate)
WebSockets using Node package ws on the server-side, and native WebSocket on client side

# ReactJS

A single root component (e.g. App) is responsible for the main application state, as well as communication with the WebSocket server
A message list component renders the chat log (chat messages and system notifications)
A chat bar component provides an input field for changing your username and an input field for sending messages. 

# Client websocket behaviour

opens a websocket connection as soon as the App component is mounted
the connection stays open until the client closes the page (or otherwise disconnects)

sends chat messages and (name change) notifications initiated by the current user
handles broadcast messages (chat, notifications, user count) from the server and alter state accordingly

# Websocket server specs

The Chatty client app and Chatty websocket server are separate Node apps each with their own package.json

It's a simple server using express and ws

The server should send and receive JSON-encoded messages

When a client sends a message:
the server determines what to do based on the message's type property
it constructs a message to send back in response with a corresponding type and a generated unique id (e.g. a UUID)

When a client connects or disconnects, the server broadcast the current user count to all connected clients

he server may assign and/or keep track of user colours (there are several ways of solving this)

## Additional Functionality

Type /giphy with any tagname to get a random gif items from Giphy Api
