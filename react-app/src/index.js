import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import DiscoverContentProvider from './context/DiscoverContentContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DiscoverContentProvider>
        <App />
      </DiscoverContentProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
