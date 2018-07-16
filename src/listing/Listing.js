import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './listing.css';

class Listing extends Component {
  
  componentWillMount() {
    this.getUsers();
  }

  getUsers() {
    const fetchedUsers = JSON.parse(localStorage.getItem('users'));
    this.setState({ users: fetchedUsers });
  }

  render() {
    return (
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
                  <td><Link to={`/user/${user.phone}/edit`} className="edit-btn btn">Edit</Link> | <button className="delete-btn btn">Delete</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }
}

export default Listing;
