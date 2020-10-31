import * as ActionTypes from './ActionTypes';

export const Quiz = (state={
    isLoading : true,
    quiz : null,
    errmess : null
},action)=>{
    switch(action.type){
        case ActionTypes.COMP_LOADING : 
            return {...state, isLoading : true , quiz : null , errmess : null};

        case ActionTypes.COMP_FAILURE : 
            return {...state , isLoading : false , quiz : null , errmess : action.payload};

        case ActionTypes.ADD_COMP : 
            return {...state , isLoading : false , quiz : action.payload , errmess : null};

        default : 
            return state;
    }
}
export default Quiz;