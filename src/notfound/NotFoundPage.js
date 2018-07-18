import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './notfound.css';

class NotFoundPage extends Component {
  render() {
    return (
      <div className="not-found-wrap">
        <Link to='/' className="home-link">Home</Link>
      </div>
    );
  }
}

export default NotFoundPage;
