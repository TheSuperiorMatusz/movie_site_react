import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
      domain="dev-2a7vygz8.us.auth0.com"
      clientId="VkMSIZ97vlPWxGMyYUHYaIZRY7tSpagf"
      redirectUri={window.location.origin}
      audience="https://dev-2a7vygz8.us.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"

  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

reportWebVitals();
