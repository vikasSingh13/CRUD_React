import React, { Component } from 'react';
import $ from 'jquery';
import './user.css';


let userList;
class ContactAddView extends Component {
    
    componentWillMount() {
      if((localStorage.getItem('users') !== null)) {
        userList = JSON.parse(localStorage.getItem('users'));
        this.setState({ users: JSON.parse(localStorage.getItem('users')) });
      }else {
        userList = [];
      }
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

    onRadioChange(event) {
      console.log(event.target.value);
    }

    submitSearch(event) {
      const email = this.email;
      let errorCount = 0;

      if(this.state !== null) {
        if(event.target.dataset.id === 'list') {
          this.props.history.push('/list');
        }else {
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
      }else {
        this.headerError.textContent = 'Contact list is empty. Start creating it!';
        this.headerError.classList.add('header-error');
        return false;
      }
    }

    submitContact() {
      if(this.validateFields()) {
        let registeredUser = {
          first_name: this.fname.value,
          last_name: this.lname.value,
          email: this.remail.value,
          phone: this.rphone.value,
          status: this.statusRadioActive.checked ? 'active' : 'inactive'
        };

        userList.push(registeredUser);

        localStorage.setItem('users', JSON.stringify(userList));

        setTimeout(function() {
          this.props.history.push('/list');
        }.bind(this), 1000);
      }
    }

    validateFields() {
      let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let validUser = true;
      if(this.state !== null) {
        this.state.users.forEach(function(item, index) {
          if(String(item.email) === this.remail.value || String(item.phone) === this.rphone.value) {
            this.headerRegisterError.textContent = 'Contact is already present!';
            this.headerRegisterError.classList.add('header-error');
            validUser = false;
          }
        }.bind(this));
      }

      if(!this.fname.value.length || !this.lname.value.length || !this.remail.value.length || !this.rphone.value.length) {
        this.headerRegisterError.classList.add('header-error');
        this.headerRegisterError.textContent = 'Every fields are Mandatory';
        validUser = false;
      }else if(!emailRegEx.test(String(this.remail.value).toLowerCase())) {
        this.headerRegisterError.textContent = 'Please enter a Valid Email!';
        this.headerRegisterError.classList.add('header-error');
        validUser = false;
      }else if(isNaN(this.rphone.value)) {
        this.headerRegisterError.textContent = 'Please enter a Valid Number!';
        this.headerRegisterError.classList.add('header-error');
        validUser = false;
      }

      if(validUser) {
        this.headerRegisterError.textContent = 'Congrats! Contact added successfully.';
        this.headerRegisterError.classList.remove('header-error');
        this.headerRegisterError.classList.add('success');
        return true;
      }else {
        return false; 
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
                            <button className="btn btn-large" data-id="list" onClick={(e) => this.submitSearch(e)} >View Contacts</button>
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
                        <div className="radio-group">
                          <label>
                            <input type="radio" name="status" value="active" checked={true} ref={input => this.statusRadioActive = input} onChange={(e) => this.onRadioChange(e)}/>
                            Active
                          </label>

                          <label>
                            <input type="radio" name="status" value="inactive" ref={input => this.statusRadioInactive = input} onChange={(e) => this.onRadioChange(e)}/>
                            Inactive
                          </label>
                        </div>
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
