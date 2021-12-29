import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import DiscoverContentProvider from './context/DiscoverContentContext';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/Modal';
import BackgroundContentProvider from './context/BackgroundContext';


const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
          <BrowserRouter>
            <BackgroundContentProvider>
                <DiscoverContentProvider>
                  <App />
                </DiscoverContentProvider>
              </BackgroundContentProvider>
          </BrowserRouter>
        </Provider>
      </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
