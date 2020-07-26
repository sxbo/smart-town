import React, {SFC} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import { About } from './pages/About';


const App: SFC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Login} exact></Route>
      <Route path="/about" component={About}></Route>
    </Switch>
  </BrowserRouter>
);

export default App;
