import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './components/App';
import Messenger from './components/Messenger';
import * as serviceWorker from './serviceWorker';
import { Route,  BrowserRouter as Router } from 'react-router-dom'  
 

const routing = (
    <Router>    
      <Route exact path="/" component={App} />
      <Route path="/Messenger" component={Messenger} /> 
      
       
  </Router>
  ) 
  ReactDOM.render(routing, document.getElementById('root'))
 
serviceWorker.unregister();
