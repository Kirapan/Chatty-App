import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import uuidv1 from 'uuid/v1';


class App extends Component {

  constructor(props) {

    super(props);
    this.socket = "";
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    console.log("componentDidMount <App />");
    console.log("connected to server")
    this.socket.onmessage = this._handleMessageReceived
  }

  _handleMessageReceived = ({ data }) => {
    const message = JSON.parse(data)
    this.setState({ messages: [...this.state.messages, message] })
  }
  
  _handleNewMessageSubmit = (content) => {
    console.log("state",this.state);
    const message = {
      username: this.state.currentUser.name,
      content,
      id: uuidv1()
    }
    this.socket.send(JSON.stringify(message))
  }

  _handleNameChange = (value) => {
    // const newObj = Object.assign({},this.state.currentUser,{name: new})
    const newObj = { ...this.state.currentUser, name: value};
    console.log("aa",newObj);
    this.setState({currentUser:newObj})
  }

  render() {
    console.log("Rending <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messageList={this.state.messages} messageID={this.state.id} />
        <ChatBar currentUser={this.state.currentUser.name} onNewName={this._handleNameChange} onNewMessageSubmit={this._handleNewMessageSubmit} />
      </div>
    );
  }
}

export default App;
