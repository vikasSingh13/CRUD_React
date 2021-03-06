import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Alert from './../alerts/Alert';
import './user.css';

let usersList, tempUserList;
class EditContact extends Component {

  //NOTE: Setting up the constructor and state before loading the component
  constructor(props) {
    super(props);
    this.state = {
      updatedID : '',
      checkedRadioActive: true,
      checkedRadioInActive: false
    };
  }

  //NOTE: Filling up the inputs to edit data when component get mounted
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
          if(item.status === 'active') {
            this.setState({checkedRadioActive: true, checkedRadioInActive: false});
          }else {
            this.setState({checkedRadioActive: false, checkedRadioInActive: true});
          }
      }
    }.bind(this));

    $('.js-contact-form input').on('change', function(event) {
      $(event.currentTarget).removeClass('highlight-error');
    });
  }

  //NOTE: Setting up the state on the basis of the Active and Inactive radio select
  onChangeRadio(event) {
    if(event.target.value === 'active') {
      this.setState({checkedRadioActive: true, checkedRadioInActive: false});
    }else {
      this.setState({checkedRadioActive: false, checkedRadioInActive: true});
    }
  }

  //NOTE: When user clicks update button after editing the data setting up the localstorage and redirecting ot list screen
  updateContact() {
    tempUserList = [];
    if(this.validateFields()) {
      usersList.forEach(function(item, index) {
        if(String(item.phone) === this.state.updatedID) {
          item.first_name = this.fname.value;
          item.last_name = this.lname.value;
          item.email = this.email.value;
          item.phone = this.phone.value;
          if(this.state.checkedRadioActive) {
            item.status = 'active';
          }else {
            item.status = 'inactive';
          }
        }
        tempUserList.push(item);
      }.bind(this));

      localStorage.setItem('users', JSON.stringify(tempUserList));
      
      setTimeout(function() {
        this.props.history.push('/list');
      }.bind(this), 1000);

    }
  }

  //NOTE: Validating the contact when adding a new contact
  validateFields() {
    let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validUser = true;

    if(!this.fname.value.length || !this.lname.value.length || !this.email.value.length || !this.phone.value.length) {
      this.headerRegisterError.classList.add('header-error');
      this.headerRegisterError.textContent = 'Every fields are Mandatory';
      
      if(!this.fname.value.length) {
        this.fname.classList.add('highlight-error');
      }

      if(!this.lname.value.length) {
        this.lname.classList.add('highlight-error');
      }

      if(!this.email.value.length) {
        this.email.classList.add('highlight-error');
      }

      if(!this.phone.value.length) {
        this.phone.classList.add('highlight-error');
      }
      validUser = false;
    }else if(!emailRegEx.test(String(this.email.value).toLowerCase())) {
      this.headerRegisterError.textContent = 'Please enter a Valid Email!';
      this.headerRegisterError.classList.add('header-error');
      this.email.classList.add('highlight-error');
      validUser = false;
    }else if(isNaN(this.phone.value)) {
      this.headerRegisterError.textContent = 'Please enter a Valid Number!';
      this.headerRegisterError.classList.add('header-error');
      this.phone.classList.add('highlight-error');
      validUser = false;
    }

    if(validUser) {
      this.headerRegisterError.textContent = 'Congrats! Contact Updated successfully.';
      this.headerRegisterError.classList.remove('header-error');
      this.headerRegisterError.classList.add('success');
      return true;
    }else {
      return false; 
    }
  }

  render() {    
    return (
      <div className="contact-wrap edit-wrap">
        {this.state.updatedID !== null ? (
          <div className="container">
            <div className="container-forms">
              <div className="container-form">
                <div className="form-item edit-contact js-contact-form">
                  <div className="table">
                    <span className="header-search register-header" ref={input => this.headerRegisterError = input}>You can update now!</span>
                    <div className="table-cell">
                      <input name="firstName" placeholder="First Name" type="text" ref={input => this.fname = input} />
                      <input name="lastName" placeholder="Last Name" type="text" ref={input => this.lname = input} />
                      <input name="email" placeholder="Email" type="text" ref={input => this.email = input} />
                      <input name="phone" placeholder="Phone" type="text" ref={input => this.phone = input} />
                      <div className="radio-group">
                        <label>
                          <input type="radio" name="status" value="active" checked={this.state.checkedRadioActive} ref={input => this.statusRadioActive = input} onChange={(e) => this.onChangeRadio(e)}/>
                          Active
                        </label>

                        <label>
                          <input type="radio" name="status" value="inactive" checked={this.state.checkedRadioInActive} ref={input => this.statusRadioInactive = input} onChange={(e) => this.onChangeRadio(e)} />
                          Inactive
                        </label>
                      </div>
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
          ): (
            <Alert type="error" to="edit"/>
          )}
      </div>
    );
  }
}

export default EditContact;
