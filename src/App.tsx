import React, {SFC} from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';


const App: SFC = () => (
  <HashRouter>
    <Switch>
      <Route path="/login" component={Login}></Route>
      <Home/>
    </Switch>
  </HashRouter>
);

export default App;
