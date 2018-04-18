import React, { Component } from 'react';

class Notification extends Component {
    render() {
        console.log("render notification")
        return (
            <div className="notification">
                <span className="notification-content">{this.props.notify}</span>
            </div>
        )

    }
}

export default Notification;