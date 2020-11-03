import * as ActionTypes from './ActionTypes';

export const Comments = (state={
    isLoading : true,
    comments : null,
    errmess : null
},action)=>{
    switch(action.type){
        case ActionTypes.COMMENTS_LOADING : 
            return {...state, isLoading : true , comments : null , errmess : null};

        case ActionTypes.COMMENTS_FAILURE : 
            return {...state , isLoading : false , comments : null , errmess : action.payload};

        case ActionTypes.ADD_COMMENTS : 
            return {...state , isLoading : false , comments : action.payload , errmess : null};

        default : 
            return state;
    }
}