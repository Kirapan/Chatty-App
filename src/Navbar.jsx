import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        console.log("render navbar")
        const aaa=this.props.userQty
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <p className="onlineUser">{this.props.userQty.qty} users online</p>
            </nav>
        )
    }
}

export default Navbar