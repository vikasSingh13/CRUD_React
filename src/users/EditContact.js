import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, browserHistory } from 'react-router-dom';
import $ from 'jquery';
import './user.css';


class EditContact extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName : '',
        lastName: '',
        email: '',
        phone: ''
      }
    }
    
    componentDidMount() {
      const usersList = JSON.parse(localStorage.getItem('users'));
      const currentProps = this.props;
      usersList.forEach(function(item, index){
        if(currentProps.match.params.id === String(item.phone)) {
          this.setState({
            firstName : item.first_name,
            lastName: item.last_name,
            email: item.email,
            phone: item.phone
          });
        }
      }.bind(this));
    }

    updateContact() {
      console.log('sign-up');
    }

    render() {    
        return (
          <div className="contact-wrap edit-wrap">
            <div className="container">
              <div className="container-forms">
                <div className="container-form">
                  <div className="form-item edit-contact">
                    <div className="table">
                      <div className="table-cell">
                        <input name="firstName" value={this.state.firstName} placeholder="First Name" type="text" />
                        <input name="lastName" value={this.state.lastName} placeholder="Last Name" type="text" />
                        <input name="email" value={this.state.email} placeholder="Email" type="text" />
                        <input name="phone" value={this.state.phone} placeholder="Phone" type="text" />
                        <button className="btn" onClick={(e) => this.updateContact(e)}>
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default EditContact;
