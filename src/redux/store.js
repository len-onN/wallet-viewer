import { legacy_createStore as createStore, combineReducers,
  applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import user from './reducers/user';

const rootReducer = ({ user });

const store = createStore(
  combineReducers(rootReducer),
  composeWithDevTools(applyMiddleware(thunk)),
);

if (window.Cypress) {
  window.store = store;
}

export default store;
