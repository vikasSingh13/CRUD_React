import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorIcon from './../images/error-icon.png';
import SuccessIcon from './../images/success-icon.png';
import $ from 'jquery';
import './alert.css';

let localUser, fetchedUsers;
class Alert extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: 'error'
    }
  }

  render() {
    const alertType = this.props.type;
    return (
      <div>
        {alertType == 'error' ? (
          <div className="alert-msg-box-2">            
            <div class="title-text alert-error">
              <span class="title-icon">
                <img src={ErrorIcon} alt="error" />
              </span>
              <h3>Empty!</h3>
            </div>
            <p>Your contact list is empty! You can <Link to="/" className="add-contact-link">Add Contact</Link> and manage it.</p>
          </div>
        ): (
          <div className="alert-msg-box-2">
            <div class="title-text alert-success">
              <span class="title-icon">
                <img src={SuccessIcon} alt="success" />
              </span>
              <h3>Success!</h3>
            </div>
            <p>You contact is added! You can <Link to="/" className="add-contact-link">Add</Link> more Contact and manage it.</p>
          </div>
        )}
      </div>
    );
  }
}

export default Alert;
