import * as ActionTypes from './ActionTypes';

export const Blogs = (state={
    isLoading : true,
    blogs : null,
    errmess : null
},action)=>{
    switch(action.type){
        case ActionTypes.BLOG_LOADING : 
            return {...state, isLoading : true , blogs : null , errmess : null};

        case ActionTypes.BLOG_FAILURE : 
            return {...state , isLoading : false , blogs : null , errmess : action.payload};

        case ActionTypes.ADD_BLOG : 
            return {...state , isLoading : false , blogs : action.payload , errmess : null};

        default : 
            return state;
    }
}
export default Blogs;