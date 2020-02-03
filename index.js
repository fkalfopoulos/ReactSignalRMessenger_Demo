import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Route,  BrowserRouter as Router } from 'react-router-dom'  
import Home from './components/Home'; 
import GitHub from './components/GitHub';

const routing = (
    <Router>    
      <Route exact path="/" component={App} />
      <Route path="/users" component={Home} /> 
       <Route path="/github" component={GitHub} /> 
  </Router>
  ) 
  ReactDOM.render(routing, document.getElementById('root'))
 
serviceWorker.unregister();
