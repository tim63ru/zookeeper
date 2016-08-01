import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import promisesMiddleware from '../middlewares/promises';
import redirectMiddleware from '../middlewares/redirect';
import * as reducers from '../reducers/index';

const reducer = combineReducers(reducers);

let createStoreWithMiddleware = compose(
    applyMiddleware(promisesMiddleware),
    applyMiddleware(redirectMiddleware)
)(createStore);

const store = createStoreWithMiddleware(reducer, {
    issues: [],
    counter: 0,
    user: {}
});

export default store;