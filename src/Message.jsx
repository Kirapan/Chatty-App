import React, { Component } from 'react';

class Message extends Component {

    render() {
        return (
            <div className="message">
                <span className="message-username" style={{ color: this.props.randomColor }}>{this.props.username}</span>
                <span className="message-content" dangerouslySetInnerHTML={{ __html: this.props.content }} />
            </div>)
    }
}

export default Message;
