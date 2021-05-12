import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './components/Navbar/MainNavBar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/profile'>
          <Profile />
        </Route>
        <Route exact path='/profile/:username'>
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
