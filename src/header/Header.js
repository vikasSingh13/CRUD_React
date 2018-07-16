import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './header.css';

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Contact Management App</h1>
      </header>
    );
  }
}

export default Header;
