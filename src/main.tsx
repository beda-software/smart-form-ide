import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from 'web/src/containers/App';
import { AEHRCFormWrapper } from './AEHRCFormWrapper';
import 'web/src/services/initialize';
import 'web/src/styles/index.scss';
import { FormRenderContext, SDCContext } from 'web/src/containers/Main/context';
import { assemble, populate } from './sdc';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
        <SDCContext.Provider value={{ assemble, populate}}>
            <FormRenderContext.Provider value={AEHRCFormWrapper}>
                <App />
            </FormRenderContext.Provider>
        </SDCContext.Provider>
    </Router>
  </React.StrictMode>,
)
