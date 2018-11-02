import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// Create reducer
const feedbackReducer = (state = [], action) => {
    console.log('In reducer!');
    if ( action.type  === 'ADD_FEEDBACK' ) {
      // action payload should be the data/rows from the Database
      return action.payload;
    }
    // For any other action type, return the current state
    return state;
  }
  
  // Create Store
  const reduxStore = createStore(
      // combineReducers so we can run more than one reducer
    combineReducers({
      feedbackReducer
    }),
    applyMiddleware(logger)
  ) // end reduxStore
  
  // Give App our Provider
  ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('root'));
  registerServiceWorker();