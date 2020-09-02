import React, {SFC} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';


const App: SFC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login}></Route>
      <Home/>
    </Switch>
  </BrowserRouter>
);

export default App;
