import * as ActionTypes from './ActionTypes';

export const News = (state={
    isLoading : true,
    news : null,
    errmess : null
},action)=>{
    switch(action.type){
        case ActionTypes.NEWS_LOADING : 
            return {...state, isLoading : true , news : null , errmess : null};

        case ActionTypes.NEWS_FAILURE : 
            return {...state , isLoading : false , news : null , errmess : action.payload};

        case ActionTypes.ADD_NEWS : 
            return {...state , isLoading : false , news : action.payload , errmess : null};

        default : 
            return state;
    }
}
export default News;