import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './header/Header';
import Listing from './listing/Listing';
import ContactAddView from './users/ContactAddView';
import EditContact from './users/EditContact';

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
