import * as ActionTypes from './ActionTypes';

export const Tasks = (state={
    isLoading : true,
    tasks : null,
    errmess : null
},action)=>{
    switch(action.type){
        case ActionTypes.TASKS_LOADING : 
            return {...state, isLoading : true , tasks : null , errmess : null};

        case ActionTypes.TASKS_FAILURE : 
            return {...state , isLoading : false , tasks : null , errmess : action.payload};

        case ActionTypes.ADD_TASKS : 
            return {...state , isLoading : false , tasks : action.payload , errmess : null};

        default : 
            return state;
    }
}