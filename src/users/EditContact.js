import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './user.css';

let usersList, tempUserList;
class EditContact extends Component {
    constructor(props) {
      super(props);
      this.state = {
        updatedID : ''
      };
    }

    componentDidMount() {
      usersList = JSON.parse(localStorage.getItem('users'));
      const currentProps = this.props;
      this.setState({'updatedID': this.props.match.params.id});

      usersList.forEach(function(item, index){
        if(currentProps.match.params.id === String(item.phone)) {
            this.fname.value = item.first_name;
            this.lname.value = item.last_name;
            this.email.value = item.email;
            this.phone.value = item.phone;
        }
      }.bind(this));
    }

    updateContact() {
      tempUserList = [];
      usersList.forEach(function(item, index) {
        if(String(item.phone) === this.state.updatedID) {
          item.first_name = this.fname.value;
          item.last_name = this.lname.value;
          item.email = this.email.value;
          item.phone = this.phone.value;
        }
        tempUserList.push(item);
      }.bind(this));

      localStorage.setItem('users', JSON.stringify(tempUserList));

      this.props.history.push('/list');
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
                        <input name="firstName" placeholder="First Name" type="text" ref={input => this.fname = input} />
                        <input name="lastName" placeholder="Last Name" type="text" ref={input => this.lname = input} />
                        <input name="email" placeholder="Email" type="text" ref={input => this.email = input} />
                        <input name="phone" placeholder="Phone" type="text" ref={input => this.phone = input} />
                        <button className="btn" onClick={(e) => this.updateContact(e)}>
                          Update
                        </button>
                        <Link to='/list' className="btn btn-secondary">Cancel</Link>
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
