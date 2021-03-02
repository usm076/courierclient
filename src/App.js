
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Signin from './components/signin';
import Signup from './components/signup';
import React , {Fragment} from 'react';
import LoggedIn from './LoggedIn';
import withAuth from './withAuth';


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from './components/search';
function App() {
  return (
    
    <Router>
      <Fragment>
        <Route exact path="/" component={withAuth(Dashboard)} />
        <Switch>
          <Route exact path="/login" component={LoggedIn(Signin)} />
          <Route exact path="/register" component={LoggedIn(Signup)} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
