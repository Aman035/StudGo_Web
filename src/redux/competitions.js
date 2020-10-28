import * as ActionTypes from './ActionTypes';

export const Competitions = (state={
    isLoading : true,
    competitions : null,
    errmess : null
},action)=>{
    switch(action.type){
        case ActionTypes.COMP_LOADING : 
            return {...state, isLoading : true , competitions : null , errmess : null};

        case ActionTypes.COMP_FAILURE : 
            return {...state , isLoading : false , competitions : null , errmess : action.payload};

        case ActionTypes.ADD_COMP : 
            return {...state , isLoading : false , competitions : action.payload , errmess : null};

        default : 
            return state;
    }
}
export default Competitions;