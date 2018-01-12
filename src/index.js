import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
if (typeof window !== 'undefined') {
  require('./index.css')
}

ReactDOM.hydrate((
  <Router>
    <App />
  </Router>
), document.getElementById('root'));
registerServiceWorker();
