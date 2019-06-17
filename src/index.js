import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {routerMiddleware, connectRouter } from 'connected-react-router';
import rootReducer from './store/reducers'

const history = createHashHistory();
const composeEnhancers = compose;

const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancers(
        applyMiddleware(
            thunk,
            routerMiddleware(history)
        )
    )
);

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
};

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
