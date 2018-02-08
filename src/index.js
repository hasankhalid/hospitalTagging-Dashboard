import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { RMWCProvider } from 'rmwc/Provider';
import { BrowserRouter } from 'react-router-dom';
import 'material-components-web/dist/material-components-web.min.css';

ReactDOM.render(
  <RMWCProvider>
    <BrowserRouter>
      <App style={{willChange: 'transform'}} />
    </BrowserRouter>
  </RMWCProvider>,
  document.getElementById('root'));
registerServiceWorker();
