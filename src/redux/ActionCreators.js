import * as ActionTypes from './ActionTypes';
import { auth, firestore, fireauth } from '../firebase/firebase';

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