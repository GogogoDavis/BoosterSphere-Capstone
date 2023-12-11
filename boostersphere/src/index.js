import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './Shop/store';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom' ;
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <Provider store={store}>
    <Router>
      <App />
    </Router>
    </Provider>
  </AuthContextProvider>
);

