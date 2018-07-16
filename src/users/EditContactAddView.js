import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, browserHistory } from 'react-router-dom';
import $ from 'jquery';
import './user.css';


class EditContactAddView extends Component {
    constructor(props) {
      super(props);
    }
    
    componentWillMount() {
      console.log(this.props);
      this.setState({ users: JSON.parse(localStorage.getItem('users')) });
    }

    submitContact() {
        console.log('sign-up');
    }

    render() {    
        return (
          <div className="login-wrap">
            <div className="container">
              <div className="box"></div>
              <div className="container-forms">
                <div className="container-info">
                  <div className="info-item">
                    <div className="table">
                      <div className="table-cell">
                        <p>
                          Want to Edit a Contact?
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
                            <Link to='/list' className="btn btn-large" onClick={(e) => this.loadList(e)}>View Contacts</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-item add-contact">
                    <div className="table">
                      <div className="table-cell">
                        <input name="firstName" placeholder="First Name" type="text" />
                        <input name="lastName" placeholder="Last Name" type="text" />
                        <input name="email" placeholder="Email" type="text" />
                        <input name="phone" placeholder="Phone" type="text" />
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

export default EditContactAddView;
