import * as ActionTypes from './ActionTypes';

export const Plans = (state={
    isLoading : true,
    plans : null,
    errmess : null
},action)=>{
    switch(action.type){
        case ActionTypes.PLANS_LOADING : 
            return {...state, isLoading : true , plans : null , errmess : null};

        case ActionTypes.PLANS_FAILURE : 
            return {...state , isLoading : false , plans : null , errmess : action.payload};

        case ActionTypes.ADD_PLANS : 
            return {...state , isLoading : false , plans : action.payload , errmess : null};

        default : 
            return state;
    }
}
export default Plans;