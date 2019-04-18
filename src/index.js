import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import './assets/scss/material-dashboard-pro-react.css';
import { Provider } from 'react-redux';
import { store, history } from './_helpers';
import indexRoutes from './routes/index.jsx';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter >
  <Provider store={store}>  
  <Router history={history}>
      <Switch>
      {indexRoutes.map((prop, key) => <Route path={prop.path} component={prop.component} key={key} />)}
      </Switch>
  </Router>  
  </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
serviceWorker.unregister();
