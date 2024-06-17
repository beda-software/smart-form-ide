import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from 'web/src/containers/App';
import { AEHRCFormWrapper } from './AEHRCFormWrapper';
import 'web/src/services/initialize';
import 'web/src/styles/index.scss';
import { FormRenderContext } from 'web/src/containers/Main/context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
        <FormRenderContext.Provider value={AEHRCFormWrapper}>
            <App />
        </FormRenderContext.Provider>
    </Router>
  </React.StrictMode>,
)
