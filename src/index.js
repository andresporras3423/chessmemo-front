import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import './index.css';
import App from './components/App';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
    <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

