import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorIcon from './../images/error-icon.png';
import SuccessIcon from './../images/success-icon.png';
import './alert.css';

class Alert extends Component {
  render() {
    const alertType = this.props.type;
    const fromPage = this.props.to;
    return (
      <div>
        {fromPage === 'list' ? (
          <div>
            {alertType === 'error' ? (
              <div className="alert-msg-box-2">            
                <div className="title-text alert-error">
                  <span className="title-icon">
                    <img src={ErrorIcon} alt="error" />
                  </span>
                  <h3>Empty!</h3>
                </div>
                <p>Your contact list is empty! You can <Link to="/" className="add-contact-link">Add Contact</Link> and manage it.</p>
              </div>
            ): (
              <div className="alert-msg-box-2">
                <div className="title-text alert-success">
                  <span className="title-icon">
                    <img src={SuccessIcon} alt="success" />
                  </span>
                  <h3>Success!</h3>
                </div>
                <p>You contact is added! You can <Link to="/" className="add-contact-link">Add</Link> more Contact and manage it.</p>
              </div>
            )}
          </div>
        ): (
          <div>
            {alertType === 'error' ? (
              <div className="alert-msg-box-2">            
                <div className="title-text alert-error">
                  <span className="title-icon">
                    <img src={ErrorIcon} alt="error" />
                  </span>
                  <h3>Empty!</h3>
                </div>
                <p>You didn't selectd any Contact to Update! You can select from <Link to="/list" className="add-contact-link">Contact List</Link> and then Edit it.</p>
              </div>
            ): (
              <div className="alert-msg-box-2">
                <div className="title-text alert-success">
                  <span className="title-icon">
                    <img src={SuccessIcon} alt="success" />
                  </span>
                  <h3>Success!</h3>
                </div>
                <p>You can directly go to home page and <Link to="/" className="add-contact-link">Add</Link> more Contact and manage it.</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Alert;
