import React, { Component } from 'react';
import './listing.css';

class Listing extends Component {
  render() {
    
    const users = this.props;
    
    return (
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.users.map(user => {
              return (
                <tr key={user.phone}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td><button className="edit-btn btn">Edit</button> | <button className="delete-btn btn">Delete</button></td>
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
