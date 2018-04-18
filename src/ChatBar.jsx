import React, { Component } from 'react';

class ChatBar extends Component {
    _handleMessageKeyPress = event => {
        if(event.key === 'Enter') {
            this.props.onNewMessageSubmit(event.target.value)
            event.target.value = ''
        }
    }

    _handleNameInput = event => {
        this.props.onNewName(event.target.value)
    }

    render() {
        console.log("Rending <ChatBar/>");        
        return (<footer className="chatbar" >
            <input type="text" name="username" onChange={this._handleNameInput} className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser}/>
            <input type="text" name="content"  className="chatbar-message" onKeyPress={this._handleMessageKeyPress} placeholder="Type a message and hit ENTER" />
        </footer>)
    }
}
export default ChatBar;
