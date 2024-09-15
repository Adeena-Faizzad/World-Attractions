import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';

import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="382031473071-ialitlio983kojlsaemekia696mbjula.apps.googleusercontent.com">
  {/* <React.StrictMode> */}
    <Provider store={store}>
      <App />
    </Provider>
  {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
);

