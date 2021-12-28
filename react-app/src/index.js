import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import DiscoverContentProvider from './context/DiscoverContentContext';
import { ModalProvider } from './context/Modal';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
          <DiscoverContentProvider>
            <App />
          </DiscoverContentProvider>
      </ModalProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
