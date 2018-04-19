import React, { Component } from 'react';

class Notification extends Component {
    render() {
        return (
            <div className="message-content">
                <span className="notification-content">{this.props.notify}</span>
            </div>
        )

    }
}

export default Notification;