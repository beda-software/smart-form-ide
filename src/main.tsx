import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from 'web/src/containers/App';
import 'web/src/services/initialize';
import 'web/src/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
        <App />
    </Router>
  </React.StrictMode>,
)
