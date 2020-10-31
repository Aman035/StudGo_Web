import * as ActionTypes from './ActionTypes';

export const Quiz = (state={
    isLoading : true,
    quiz : null,
    errmess : null
},action)=>{
    switch(action.type){
        case ActionTypes.QUIZ_LOADING : 
            return {...state, isLoading : true , quiz : null , errmess : null};

        case ActionTypes.QUIZ_FAILURE : 
            return {...state , isLoading : false , quiz : null , errmess : action.payload};

        case ActionTypes.ADD_QUIZ : 
            return {...state , isLoading : false , quiz : action.payload , errmess : null};

        default : 
            return state;
    }
}
export default Quiz;