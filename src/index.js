import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// Create reducer
const feedbackReducer = (state = {feeling: '', understanding: '', support: '', comments: '',}, action) => {
    console.log('In reducer!');
    // action payload should be the data we need to add to reduxState
    // matches action to add correctly to state
    if ( action.type  === 'ADD_FEELING' ) {
      state.feeling = action.payload;
    }
    if ( action.type  === 'ADD_UNDERSTANDING' ) {
        state.understanding = action.payload;
      }
    if ( action.type  === 'ADD_SUPPORT' ) {
        state.support = action.payload;
    }
    if ( action.type  === 'ADD_COMMENTS' ) {
        state.comments = action.payload;
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