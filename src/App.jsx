import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {

  constructor(props) {

    super(props);
    this.socket = "";
    this.state = {
      online:{},
      currentUser: { name: "Anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    console.log("componentDidMount <App />");
    this.socket.onopen = (event) => {
      console.log("Connected to server");
      this.setState({online: event.data})
    };
    this.socket.onmessage = this._handleMessageReceived
  }

  _handleMessageReceived = ({ data }) => {
    const message = JSON.parse(data)
    if (message.type === "incomingNotification") {
      const newNote = [...this.state.messages, message]
      this.setState({ messages:newNote })
    } else if(message.type === "incomingMessage") {
      this.setState({ messages: [...this.state.messages, message] })
    } else {
      this.setState({online: message})
    }
  }

  _handleNewMessageSubmit = (content) => {
    const message = {
      username: this.state.currentUser.name,
      content,
      type: "postMessage"
    }
    this.socket.send(JSON.stringify(message))
  }

  _handleNameChange = (value) => {
    const message = {
      username: value,
      type: "postNotification",
      content: `${this.state.currentUser.name} changed their name to ${value}`
    }
    this.socket.send(JSON.stringify(message))
    const newObj = { ...this.state.currentUser, name: message.username };
    this.setState({currentUser:newObj})
  }

  render() {
    console.log("Rending <App/>");
    return (
      <div>
       <Navbar userQty={this.state.online}/>
        <main className="messages">
        <MessageList messageList={this.state.messages}/>
        </main>
        <ChatBar currentUser={this.state.currentUser.name} onNewName={this._handleNameChange} onNewMessageSubmit={this._handleNewMessageSubmit} />
      </div>
    );
  }
}

export default App;
