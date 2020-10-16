import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';

import './App.css';
import SearchPage from './components/SearchPage';
import Home from './components/Home';

function App() {
  const [collection, setCollection] = useState([])

  function addRepos(item) {
    setCollection([...collection, { item }])
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home"></Redirect>
          </Route>
          <Route exact path="/home" render={(props) => <Home {...props} collection={collection} />} />
          <Route exact path="/search" render={(props) => <SearchPage {...props} addRepos={addRepos} />} />
        </Switch>

      </Router>

    </div>
  );
}

export default App;
//<Route exact path="/search" component={SearchPage} />
/*  */