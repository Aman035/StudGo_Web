import * as ActionTypes from './ActionTypes';

export const Projects = (state={
    isLoading : true,
    projects : null,
    errmess : null
},action)=>{
    switch(action.type){
        case ActionTypes.PROJECTS_LOADING : 
            return {...state, isLoading : true , projects : null , errmess : null};
        case ActionTypes.PROJECTS_FAILURE : 
            return {...state , isLoading : false , projects : null , errmess : action.payload};
        case ActionTypes.ADD_PROJECTS: 
            return {...state , isLoading : false , projects : action.payload , errmess : null};
        default : 
            return state;
    }
}