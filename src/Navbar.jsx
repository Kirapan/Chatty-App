import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        if (this.props.userQty.qty === 1) {
            return (<nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <p className="onlineUser">{this.props.userQty.qty} user online</p>
            </nav>)
        } else {
            return (<nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <p className="onlineUser">{this.props.userQty.qty} users online</p>
            </nav>)
        }
    }
}

export default Navbar