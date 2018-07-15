import React, { Component } from 'react';
import './App.css';
import Header from './header/Header';
import Listing from './listing/Listing';

const users = [
  {
    first_name: 'vikas',
    last_name: 'singh',
    phone: 854521,
    email: 'vikas.singh@gmail.com'
  },{
    first_name: 'vilas',
    last_name: 'kumkar',
    phone: 854522,
    email: 'vilas.kumkar@gmail.com'
  },{
    first_name: 'madhukar',
    last_name: 'anand',
    phone: 854523,
    email: 'madhukar.anand@gmail.com'
  }
];

localStorage.setItem('users', JSON.stringify(users));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentWillMount() {
    this.getUsers();
  }

  getUsers() {
    const fetchedUsers = JSON.parse(localStorage.getItem('users'));

    this.setState({ users: fetchedUsers });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="content">
          <div className="App-intro">
            <h2>Users Listing</h2>
          </div>
          <Listing 
            users={this.state.users}
          />
        </div>
      </div>
    );
  }
}

export default App;
