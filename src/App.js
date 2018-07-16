import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './header/Header';
import Listing from './listing/Listing';
import ContactAddView from './users/ContactAddView';
import EditContact from './users/EditContact';

const users = [
  {
    first_name: 'vikas',
    last_name: 'singh',
    phone: 854521,
    email: 'vikas.singh@gmail.com',
    status: 'active'
  },{
    first_name: 'vilas',
    last_name: 'kumkar',
    phone: 854522,
    email: 'vilas.kumkar@gmail.com',
    status: 'inactive'
  },{
    first_name: 'madhukar',
    last_name: 'anand',
    phone: 854523,
    email: 'madhukar.anand@gmail.com',
    status: 'active'
  }
];

localStorage.setItem('users', JSON.stringify(users));

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            <Switch>
              <Route exact path='/' component={ContactAddView} />
              <Route exact path='/list' component={Listing} />
              <Route path='/user/:id/edit' component={EditContact} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
