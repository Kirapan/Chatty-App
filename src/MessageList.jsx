import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        
        const chatMessage = this.props.messageList.map(item =>
            (<Message key={item.id} username={item.username} content={item.content} />)
        );
        return (<main className="messages">
            {chatMessage}
        </main>)
    }
}

export default MessageList;