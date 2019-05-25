import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';
if (typeof window !== 'undefined') {
  require('./index.css')
}

//ReactDOM.hydrate((
ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById('root'));
serviceWorker.register();
