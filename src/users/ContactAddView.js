import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './user.css';


let tempUserList;
class ContactAddView extends Component {
    
    componentWillMount() {
      this.setState({ users: JSON.parse(localStorage.getItem('users')) });
    }

    showAdd() {
      $(".container").addClass("search-contact");
    }

    showSearch() {
      $(".container").removeClass("search-contact");
    }

    inputChanged(event) {
      if(event.target.value.length) {
        this.headerError.textContent = 'Search the Contact!';
        this.headerError.classList.remove('header-error');
        this.email.nextElementSibling.classList.add('hide');
        this.email.nextElementSibling.textContent = ' ';
      }
    }

    submitSearch() {
      const email = this.email;
      let errorCount = 0;

      email.nextElementSibling.classList.add('hide');
      email.nextElementSibling.textContent = ' ';

      if(email.value.length) {
          this.state.users.forEach(function(item, index){
              if(email.value !== item.email) {
                  errorCount++;
              }else {
                  errorCount--;
              }
          });
      }else {
         this.headerError.classList.remove('hide');
         this.headerError.textContent = 'Email field cannot be Empty!';
         this.headerError.classList.add('header-error');
         return false;
      }
      
      if(errorCount === this.state.users.length) {
          email.nextElementSibling.classList.remove('hide');
          email.nextElementSibling.textContent = 'Sorry! This email is not present.';
          return false;
      }else {
          this.headerError.textContent = 'Contact is present!';
          this.headerError.classList.add('success');
      }
    }

    submitContact() {
      tempUserList = [];
      
      if(this.validateFields()) {
        alert('success');
        this.props.history.push('/list');
      }
    }

    validateFields() {
      let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      this.state.users.forEach(function(item, index) {
        if(String(item.phone) === this.remail.value || String(item.phone) === this.rphone.value) {
          alert('Duplicate User');
          return false;
        }
      }.bind(this));

      if(!this.fname.value.length || !this.lname.value.length || !this.remail.value.length || !this.rphone.value.length) {
        this.headerRegisterError.classList.add('header-error');
        this.headerRegisterError.textContent = 'Every fields are Mandatory';
        return false;
      }else if(!emailRegEx.test(String(this.remail.value).toLowerCase())) {
        alert('wrong email');
        return false;
      }else if(isNaN(this.rphone.value)) {
        alert('is should be a number');
        return false;
      }else {
        return true;
      }
    }

    render() {    
        return (
          <div className="contact-wrap">
            <div className="container">
              <div className="box"></div>
              <div className="container-forms">
                <div className="container-info">
                  <div className="info-item">
                    <div className="table">
                      <div className="table-cell">
                        <p>
                          Want to search a Contact?
                        </p>
                        <div className="btn" onClick={(e) => this.showSearch(e)}>
                          Search
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="table">
                      <div className="table-cell">
                        <p>
                          Want to add a Contact? 
                        </p>
                        <div className="btn" onClick={(e) => this.showAdd(e)}>
                          Add Contact
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-form">
                  <div className="form-item search-contact">
                    <div className="table">
                      <span className="header-search" ref={input => this.headerError = input}>Search the Contact!</span>
                      <div className="table-cell">
                        <div className="form-group">
                            <input name="email" placeholder="Email" type="text" ref={input => this.email = input} onChange={(e) => this.inputChanged(e)}/>
                            <span className="error hide"></span>
                        </div>
                        <div className="action-wrap">
                            <button className="btn" onClick={(e) => this.submitSearch(e)}>
                              Search
                            </button>
                            <Link to='/list' className="btn btn-large">View Contacts</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-item add-contact">
                    <div className="table">
                      <span className="header-search register-header" ref={input => this.headerRegisterError = input}>Add a New Contact!</span>
                      <div className="table-cell">
                        <input name="firstName" placeholder="First Name" type="text" ref={input => this.fname = input} />
                        <input name="lastName" placeholder="Last Name" type="text" ref={input => this.lname = input} />
                        <input name="email" placeholder="Email" type="text" ref={input => this.remail = input} />
                        <input name="phone" placeholder="Phone" type="text" ref={input => this.rphone = input} />
                        <button className="btn" onClick={(e) => this.submitContact(e)}>
                          Add
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

export default ContactAddView;
