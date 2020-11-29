import * as ActionTypes from './ActionTypes';

export const Answers = (state={
    isLoading : true,
    answers : null,
    errmess : null
},action)=>{
    switch(action.type){
        case ActionTypes.ANSWERS_LOADING : 
            return {...state, isLoading : true , answers : null , errmess : null};

        case ActionTypes.ANSWERS_FAILURE : 
            return {...state , isLoading : false , answers : null , errmess : action.payload};

        case ActionTypes.ADD_ANSWERS : 
            return {...state , isLoading : false , answers : action.payload , errmess : null};

        default : 
            return state;
    }
}
export default Answers;