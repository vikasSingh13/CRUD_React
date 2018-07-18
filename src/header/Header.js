import React, { Component } from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';
import './header.css';

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
        <h1 className="App-title">Welcome to Contact Management App</h1>
      </header>
    );
  }
}

export default Header;
