import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from './../alerts/Alert';
import $ from 'jquery';
import './listing.css';

let localUser, fetchedUsers;
class Listing extends Component {

  //NOTE: Checking for avalabitlity of data before Component Mount in Localstorage
  componentWillMount() {
    if((localStorage.getItem('users') !== null)) { 
      this.getUsers();
      this.setState({
        showAlert: false,
        showConfirmation: false,
        deletedRow: null,
        eventElement: null
      });
    }else {
      this.setState({
        showAlert: true
      });
    }
  }

  //NOTE: Fetching data from localstorage and setting the state of component
  getUsers() {
    fetchedUsers = [];
    fetchedUsers = JSON.parse(localStorage.getItem('users'));
    this.setState({ users: fetchedUsers });
  }

  //NOTE: Opening a confirmation box before deleteting
  openConfirmation(event) {
    const rowRemoved = $(event.currentTarget).data('id');
    this.setState({ showConfirmation: true, deletedRow: rowRemoved, eventElement: $(event.currentTarget) });
    $('.js-table').addClass('blur-it');
  }

  //NOTE: Getting confirmation
  confirmation(event) {
    const confirm = $(event.currentTarget).data('value');
    if(confirm === 'yes') {
      this.deleteRow(this.state.deletedRow, this.state.eventElement);
    }else {
      $('.js-table').removeClass('blur-it');
      this.setState({ showConfirmation: false, deletedRow: null, eventElement: null });  
    }
  }

  //NOTE: Deleting of a row and data from the localstorage
  deleteRow(value, event) {
    localUser = [];
    const rowRemoved = String(value);
    
    fetchedUsers.forEach(function(item, index) {
      if(item.phone !== rowRemoved) {
        localUser.push(item);
      }
    });

    if(fetchedUsers.length < 2) {
      fetchedUsers.length = 0;
      localUser.length = 0;
    }

    localStorage.removeItem('users');
    localStorage.setItem('users', JSON.stringify(localUser));

    event.closest('tr').remove();

    if(!JSON.parse(localStorage.getItem('users')).length) {
      localStorage.removeItem('users');
    }

    $('.js-table').removeClass('blur-it');
    this.setState({ showConfirmation: false, deletedRow: null, eventElement: null });

    if((localStorage.getItem('users') === null)) {
      this.setState({
        showAlert: true
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.showAlert ? (
          <div className="alert-wrap">
            <Alert type="error" to="list" />
          </div>
          ): (
          <div className="table-wrap">
            <div>
              {this.state.showConfirmation ? (
                <div className="confirmation-box">
                  <p>Are you sure, you want to delete this Contact?</p>
                  <div className="action-wrap">
                    <button className="delete-btn btn" data-value="yes" onClick={(e) => this.confirmation(e)}>Yes</button>
                    <button className="delete-btn btn" data-value="no" onClick={(e) => this.confirmation(e)}>No</button>
                  </div>
                </div>
              ): ''}
            </div>
            <div>
              <Link to='/' className="home-link">Add Contact!</Link>
              <div className="table-inner">
                <table className="user-table js-table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.users.map(user => {
                        return (
                          <tr key={user.phone}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td><Link to={`/user/${user.phone}/edit`} className="edit-btn btn">Edit</Link> | <button data-id={`${user.phone}`} className="delete-btn btn" onClick={(e) => this.openConfirmation(e)}>Delete</button></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Listing;
