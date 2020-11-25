import * as ActionTypes from './ActionTypes';

export const Questions = (state={
    isLoading : true,
    questions : null,
    errmess : null
},action)=>{
    switch(action.type){
        case ActionTypes.QUESTIONS_LOADING : 
            return {...state, isLoading : true , questions : null , errmess : null};
        case ActionTypes.QUESTIONS_FAILURE : 
            return {...state , isLoading : false , questions : null , errmess : action.payload};
        case ActionTypes.ADD_QUESTIONS: 
            return {...state , isLoading : false , questions : action.payload , errmess : null};
        default : 
            return state;
    }
}