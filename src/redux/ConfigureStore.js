import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './Auth';
import {Tasks} from './Tasks';
import {News} from './News';
import {Competitions} from './competitions';
import {Quiz} from './quiz';
import {Blogs} from './blogs';
import {Comments} from './comments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            tasks : Tasks ,
            news : News ,
            competitions : Competitions,
            quiz : Quiz,
            blogs : Blogs,
            comments : Comments
        }),
       applyMiddleware(thunk, logger)
    );

    return store;
}