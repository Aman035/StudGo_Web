import * as ActionTypes from './ActionTypes';
import { auth, firestore, fireauth,firebasestore } from '../firebase/firebase';

/***********************LOGIN LOGOUT *******************************************************************************************/
export const requestLogin = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST
    }
}  
export const receiveLogin = (user) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        user
    }
}  
export const checkUser = ()=>(dispatch)=>{
    auth.onAuthStateChanged(user=>{
        dispatch(requestLogin());
        if(user)
        {
                localStorage.setItem('user', JSON.stringify(user));
                // Dispatch the success action
                dispatch(receiveLogin(user));
                (dispatch(fetchTasks()))
                firestore.collection('users').doc(user.email).get()
                .then( doc =>{
                    if(!doc.exists){
                        firestore.collection('users').doc(user.email).set({
                            displayName : user.displayName,
                            photoUrl : user.photoURL,
                            email : user.email
                        })
                    }
                 })
        }
        else
        {
            dispatch(loginError("No previous user"));
        }
    })
}
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}
export const googleLogin = () => (dispatch) => {
    const provider = new fireauth.GoogleAuthProvider();
    dispatch(requestLogin());
    auth.signInWithPopup(provider)
        .then((result) => {
            var user = result.user;
            localStorage.setItem('user', JSON.stringify(user));
            // Dispatch the success action
            dispatch(receiveLogin(user));
            (dispatch(fetchTasks()))
            firestore.collection('users').doc(user.email).get()
            .then( doc =>{
                if(!doc.exists){
                    firestore.collection('users').doc(user.email).set({
                        displayName : user.displayName,
                        photoUrl : user.photoURL,
                        email : user.email
                    })
                }
            })
        })
        .catch((error) => {
            dispatch(loginError(error.message));
        });
}
export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
} 
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}
// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    auth.signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    localStorage.removeItem('user');
    dispatch(receiveLogout())
}
/***************************************************************************************************************************/

/***************************************Task requests*******************************************************************************/
export const postTask = (task) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    firestore.collection('tasks').doc(auth.currentUser.email).collection('task').add({
        title : task.title,
        content : task.content,
        done : false
    })
    .then(dispatch(fetchTasks()))
    .catch(error => dispatch(tasksFailed(error.message)));
}

export const deleteTask = (taskId) => (dispatch) => {
    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    dispatch(tasksLoading())
    firestore.collection('tasks').doc(auth.currentUser.email).collection('task').doc(taskId).delete()
    .then(()=>{
        console.log("DEl");
        dispatch(fetchTasks())})
    .catch(error=> dispatch(tasksFailed(error.message)));
};
export const doneTask = (taskId,status) => (dispatch) => {
    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    dispatch(tasksLoading())
    firestore.collection('tasks').doc(auth.currentUser.email).collection('task').doc(taskId).update({
        done : status
    })
    .then(()=>{
        dispatch(fetchTasks())})
    .catch(error=> dispatch(tasksFailed(error.message)));
};
export const fetchTasks = () => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    var user = auth.currentUser;
    dispatch(tasksLoading(true));

        return firestore.collection('tasks').doc(user.email).collection('task').get()
        .then(snapshot => {
            let tasks=[];
            snapshot.forEach(doc => {
                const data = doc.data();
                const _id = doc.id
                tasks.push({_id,...data});
            });
            return tasks;
        })
    .then(tasks => dispatch(addTasks(tasks)))
    .catch(error => dispatch(tasksFailed(error.message)));
}
export const tasksLoading = () => ({
    type: ActionTypes.TASKS_LOADING
});
export const tasksFailed = (errmess) =>({
    type : ActionTypes.TASKS_FAILURE,
    payload : errmess
});
export const addTasks = (tasks) => ({
    type: ActionTypes.ADD_TASKS,
    payload: tasks
});
/****************************************************************************************************************************/

/************************************************NEWS-REQUEST*******************************************************************/
export const fetchNews = ()=>(dispatch)=>{
    dispatch(newsLoading());

    fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then(response=>{
        if(response.ok){
            return response;//passed to below then
        }
        else{
            //this block is executed when connection to server is made but some error is occuring in receiving or posting files
            var error = new Error("Error "+response.status+": " + response.statusText);//creating error object
            error.response = response;
            throw error;
        }
    },
    error =>{
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(async response=>{
        var news=[];
        for(var i=0;i<25;i++)
        {
              await fetch('https://hacker-news.firebaseio.com/v0/item/'+response[i].toString()+'.json?print=pretty')
             .then(resp=>{
                 if(resp.ok)
                 return resp;
             })
             .then(resp=>resp.json())
            .then((resp)=>{
                var data={
                    id : resp.id,
                    title:resp.title,
                    url:resp.url
                }
                    news.push(data);//passed to below then
            })
        }
        return news;
    })
    .then(news=> dispatch(addNews(news)))
    .catch(error => dispatch(newsFailed(error.message)))
};
export const newsLoading = () => ({
    type: ActionTypes.NEWS_LOADING
});
export const newsFailed = (errmess) =>({
    type : ActionTypes.NEWS_FAILURE,
    payload : errmess
});
export const addNews = (news) => ({
    type: ActionTypes.ADD_NEWS,
    payload: news
});

/************************************************CONTEST-REQUEST*******************************************************************/

export const fetchCompetitions = ()=>async(dispatch)=>{
    dispatch(compLoading());
    var date = new Date();
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url =[
        'https://clist.by/api/v1/contest/?resource__id=1',
        'https://clist.by/api/v1/contest/?resource__id=2',
        'https://clist.by/api/v1/contest/?resource__id=35',
        'https://clist.by/api/v1/contest/?resource__id=102'
    ]

    var comp=[];
    // const month = date.getMonth();
    // date = toString()

    for( var i=0;i<4;i++){

    await fetch(proxyurl+url[i]+'&order_by=start&format=json&start__gte='+date.getFullYear()+'-'+(parseInt(date.getMonth())+1).toString()+'-01T00%3A00%3A00',
        {
            headers: {
                'Authorization': 'ApiKey StudGO:6435c0c6e2a47cf37f64a4cf096a920b8c096bf5',
            }
        })
        .then(response=>{
            if(response.ok){
                return response;//passed to below then
            }
            else{
                //this block is executed when connection to server is made but some error is occuring in receiving or posting files
                var error = new Error("Error "+response.status+": " + response.statusText);//creating error object
                error.response = response;
                throw error;
            }
        },
            error =>{
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then(resp => resp.json())
        .then(resp=>{comp.push(resp)})
        .catch(error => dispatch(compFailed(error.message)))
    }
    dispatch(addComp(comp));
}
export const compLoading = () => ({
    type: ActionTypes.COMP_LOADING
});

export const compFailed = () => ({
    type : ActionTypes.COMP_FAILURE
});
export const addComp = (comp) =>({
    type : ActionTypes.ADD_COMP,
    payload : comp
});

/*******************************************************************************************************************/

/************************************************QUIZ-REQUEST*******************************************************************/

export const fetchQuiz = ()=>(dispatch)=>{
    dispatch(quizLoading());
    firestore.collection('quiz').get()
        .then(snapshot => {
            let quiz=[];
            snapshot.forEach(doc => {
                const data = doc.data();
                const _id = doc.id
                quiz.push({_id,...data});
            });
            return quiz;
        })
    .then(quiz => dispatch(addQuiz(quiz)))
    .catch(error => dispatch(quizFailed(error.message)));
}

export const quizLoading = () => ({
    type: ActionTypes.QUIZ_LOADING
});

export const quizFailed = () => ({
    type : ActionTypes.QUIZ_FAILURE
});
export const addQuiz = (quiz) =>({
    type : ActionTypes.ADD_QUIZ,
    payload : quiz
});

/*******************************************************************************************************************/
/************************************************BLOG-REQUEST*******************************************************************/
export const postBlog = (blog) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    var newDocRef = firestore.collection('blogs').doc();
    newDocRef.set({
        blogWriter : auth.currentUser.email,
        author : auth.currentUser.displayName,
        blogID : newDocRef.id,
        photo : auth.currentUser.photoURL,
        title : blog.title,
        content : blog.content,
        tags : blog.tags,
        likes : {},
        createdAt: firebasestore.FieldValue.serverTimestamp()
    })
    .then(dispatch(fetchBlog()))
    .catch(error => dispatch(blogFailed(error.message)));
}
export const updateBlog = async(blog)=>{

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    await firestore.collection('blogs').doc(blog.blogID).update(blog)
    //dispatch(fetchBlog());
}

export const deleteBlog = (blogId) => (dispatch) => {
    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    dispatch(blogLoading())
    firestore.collection('blogs').doc(blogId).delete()
    .then(()=>{
        dispatch(fetchBlog())})
    .catch(error=> dispatch(blogFailed(error.message)));
};


export const fetchBlog = ()=>(dispatch)=>{
    dispatch(blogLoading());
        firestore.collection('blogs').get()
        .then(snapshot => {
            let blogs=[];
            snapshot.forEach(doc => {
                const data = doc.data();
                const _id = doc.id
                blogs.push({_id,...data});
            });
            return blogs;
        })
    .then(blogs => dispatch(addBlog(blogs)))
    .catch(error => dispatch(blogFailed(error.message)));
}

export const blogLoading = () => ({
    type: ActionTypes.BLOG_LOADING
});

export const blogFailed = () => ({
    type : ActionTypes.BLOG_FAILURE
});
export const addBlog = (blogs) =>({
    type : ActionTypes.ADD_BLOG,
    payload : blogs
});

/*******************************************************************************************************************/
/************************************************COOMENTS-REQUEST*******************************************************************/
export const fetchComments = (blogID)=>(dispatch)=>{
    dispatch(commentLoading());
        firestore.collection('comments').doc(blogID).collection('comments').get()
        .then(snapshot => {
            let comments=[];
            snapshot.forEach(doc => {
                const data = doc.data();
                const _id = doc.id
                comments.push({_id,...data});
            });
            return comments;
        })
    .then(comments => dispatch(addcomment(comments)))
    .catch(error => dispatch(commentFailed(error.message)));
}


export const postComment = (comment,blogID) => (dispatch) => {

    console.log(comment);
    console.log(blogID);
    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    firestore.collection('comments').doc(blogID).collection('comments').add({
        comment : comment,
        displayName : auth.currentUser.displayName,
        photoUrl : auth.currentUser.photoURL,
        userEmail : auth.currentUser.email,
        timestamp : firebasestore.FieldValue.serverTimestamp()
    })
    .then(dispatch(fetchComments(blogID)))
    .catch(error => dispatch(commentFailed(error.message)));
}

export const commentLoading = () => ({
    type: ActionTypes.COMMENTS_LOADING
});

export const commentFailed = () => ({
    type : ActionTypes.COMMENTS_FAILURE
});
export const addcomment = (comments) =>({
    type : ActionTypes.ADD_COMMENTS,
    payload : comments
});

/*******************************************************************************************************************/