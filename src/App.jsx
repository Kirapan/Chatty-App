import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = "";
    this.state = {
      online: {},
      currentUser: { name: "Anonymous", color: "" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" })
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }


  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };
    this.socket.onmessage = this._handleMessageReceived
    this.scrollToBottom();
  }

  _handleMessageReceived = ({ data }) => {
    const message = JSON.parse(data)
    if (message.type === "incomingNotification") {
      const newNote = [...this.state.messages, message]
      this.setState({ messages: newNote })
    } else if (message.type === "incomingMessage") {
      this.setState({ messages: [...this.state.messages, message] })
    } else {
      this.setState({ online: message })
    }
  }

  _handleNewMessageSubmit = (content) => {
    const message = {
      username: this.state.currentUser.name,
      content,
      type: "postMessage",
      color: ""
    }
    this.socket.send(JSON.stringify(message))
  }

  _handleNameChange = (value) => {
    if (value !== this.state.currentUser.name) {
      const message = {
        username: value,
        type: "postNotification",
        content: `${this.state.currentUser.name} changed their name to ${value}`
      }
      this.socket.send(JSON.stringify(message))
      const newObj = { ...this.state.currentUser, name: message.username };
      this.setState({ currentUser: newObj })
    }
  }


  render() {
    return (
      <div>
        <Navbar userQty={this.state.online} />
        <main className="messages">
          <MessageList messageList={this.state.messages} />
        </main>
        <div style={{ float: "left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
        <ChatBar currentUser={this.state.currentUser.name} onNewName={this._handleNameChange} onNewMessageSubmit={this._handleNewMessageSubmit} />
      </div>
    );
  }
}

export default App;
