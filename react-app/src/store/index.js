import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import question from './question';
import profile from './profile';
import conversation from './conversation'
import message from './message'
import horoscope from './horoscope'
import search from './search'
import gender from './gender'
import smoking from './smoking'
import drinking from './drinking'
import children from './children'
import pet from './pet'
import politic from './politic'
import religion from './religion'
import partner from './partner'
import orientation from './orientation'

const rootReducer = combineReducers({
  session,
  question,
  profile,
  conversation,
  message,
  horoscope,
  search,
  gender,
  smoking,
  drinking,
  children,
  pet,
  politic,
  religion,
  partner,
  orientation
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
