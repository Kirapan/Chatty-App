import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
    
    
    render() {
        const chatMessage = this.props.messageList.map(item => {
            if (item.type === "incomingMessage") {
                return (<Message key={item.id} username={item.username} content={item.content} randomColor={item.color} />);
            } else if (item.type === "incomingNotification") {
                return (<Notification key={item.id} notify={item.content} />);
            }
        });
        return (
            <div>
                {chatMessage}
            </div>
            )
        }
}

export default MessageList;