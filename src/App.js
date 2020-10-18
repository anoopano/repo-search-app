import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import './App.css';
import SearchPage from './components/SearchPage';
import Home from './components/Home';

function App() {
  const [collection, setCollection] = useState([])

  function addRepos(item) {
    setCollection([...collection, { item }])
  }
  useEffect(() => {
    if (localStorage.getItem('myKey')) {
      setCollection(JSON.parse(localStorage.getItem('myKey')))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('myKey', JSON.stringify(collection))
  }, [collection])

  function deleteCollection(id){
    const newCollection = collection.filter((item)=> item.item.id !== id)
    setCollection(newCollection)
  }

  return (
    <div className="app container">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home"></Redirect>
          </Route>
          <Route exact path="/home" render={(props) => <Home {...props} collection={collection} deleteFn={deleteCollection}/>} />
          <Route exact path="/search" render={(props) => <SearchPage {...props} addRepos={addRepos} />} />
        </Switch>

      </Router>

    </div>
  );
}

export default App;
//<Route exact path="/search" component={SearchPage} />
/*  */