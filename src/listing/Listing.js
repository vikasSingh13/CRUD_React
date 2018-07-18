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
        showAlert: false
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

  //NOTE: Deleting of a row and data from the localstorage
  deleteRow(event) {
    localUser = [];
    const rowRemoved = $(event.currentTarget).data('id');
    
    fetchedUsers.forEach(function(item, index) {
      if(item.phone !== String(rowRemoved)) {
        localUser.push(item);
      }
    });

    if(fetchedUsers.length < 2) {
      fetchedUsers.length = 0;
      localUser.length = 0;
    }

    localStorage.removeItem('users');
    localStorage.setItem('users', JSON.stringify(localUser));

    $(event.currentTarget).closest('tr').remove();

    if(!JSON.parse(localStorage.getItem('users')).length) {
      localStorage.removeItem('users');
    }

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
              <Link to='/' className="home-link">Add Contact!</Link>
              <div className="table-inner">
                <table className="user-table">
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
                            <td><Link to={`/user/${user.phone}/edit`} className="edit-btn btn">Edit</Link> | <button data-id={`${user.phone}`} className="delete-btn btn" onClick={(e) => this.deleteRow(e)}>Delete</button></td>
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
