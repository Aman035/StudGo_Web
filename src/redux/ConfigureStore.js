import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './Auth';
import {Tasks} from './Tasks';
import {News} from './News';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            tasks : Tasks ,
            news : News
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}