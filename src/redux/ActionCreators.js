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

    var newDocRef = firestore.collection('tasks').doc(auth.currentUser.email).collection('task').doc();
    newDocRef.set({
        title : task.title,
        content : task.content,
        done : false,
        taskID : newDocRef.id,
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

export const deleteBlog = (blogId) => async(dispatch) => {
    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    dispatch(blogLoading())
    await firestore.collection('blogs').doc(blogId).delete();
    await firestore.collection('comments').doc(blogId).collection('comments').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                firestore.collection('comments').doc(blogId).collection('comments').doc(doc.id).delete();
            });
        })
    dispatch(fetchBlog());
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

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    var newDocRef = firestore.collection('comments').doc(blogID).collection('comments').doc();
    newDocRef.set({
        comment : comment,
        commentID : newDocRef.id,
        displayName : auth.currentUser.displayName,
        photoUrl : auth.currentUser.photoURL,
        userEmail : auth.currentUser.email,
        timestamp : firebasestore.FieldValue.serverTimestamp()
    })
    .then(dispatch(fetchComments(blogID)))
    .catch(error => dispatch(commentFailed(error.message)));
}

export const deleteComment = (blogID,commentID) => async(dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    await firestore.collection('comments').doc(blogID).collection('comments').doc(commentID).delete()
    dispatch(fetchComments(blogID))
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

/*********************************************PROJECT-REQUESTS**********************************************************************/
export const fetchProjects = ()=>(dispatch)=>{
    dispatch(projectsLoading());
        firestore.collection('projects').get()
        .then(snapshot => {
            let projects=[];
            snapshot.forEach(doc => {
                projects.push(doc.data());
            });
            return projects;
        })
    .then(projects => dispatch(addProjects(projects)))
    .catch(error => dispatch(projectsFailed(error.message)));
}

export const postProject = (project) => (dispatch) => {
    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    var newDocRef = firestore.collection('projects').doc();
    newDocRef.set({
        projectID : newDocRef.id,
        displayName : auth.currentUser.displayName,
        photoUrl : auth.currentUser.photoURL,
        userEmail : auth.currentUser.email,
        author : auth.currentUser.displayName,
        timestamp : firebasestore.FieldValue.serverTimestamp(),
        title : project.title,
        content : project.content,
        link : project.link,
        tags : project.tags,
        upvotes : {},
        downvotes : {},
        upvoteCounter : 0,
        downvoteCounter : 0
    })
    .then(dispatch(fetchProjects()))
    .catch(error => dispatch(projectsFailed(error.message)));
}

export const deleteProject = (projectID) => async(dispatch) => {
    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    await firestore.collection('projects').doc(projectID).delete()
    dispatch(fetchProjects());
}

export const updateProject = async(project)=>{

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    await firestore.collection('projects').doc(project.projectID).update(project)
    //dispatch(fetchBlog());
}

export const projectsLoading = () => ({
    type: ActionTypes.PROJECTS_LOADING
});

export const projectsFailed = () => ({
    type : ActionTypes.PROJECTS_FAILURE
});
export const addProjects = (projects) =>({
    type : ActionTypes.ADD_PROJECTS,
    payload : projects
});
/*******************************************************************************************************************/

/*********************************************QUESTION-REQUESTS**********************************************************************/
export const fetchQuestions = ()=>(dispatch)=>{
    dispatch(questionsLoading());
        firestore.collection('questions').get()
        .then(snapshot => {
            let questions=[];
            snapshot.forEach(doc => {
                questions.push(doc.data());
            });
            return questions;
        })
    .then(questions => dispatch(addQuestions(questions)))
    .catch(error => dispatch(questionsFailed(error.message)));
}

export const postQuestion = (question) => (dispatch) => {
    console.log(question);
    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    var newDocRef = firestore.collection('questions').doc();
    newDocRef.set({
        questionID : newDocRef.id,
        photoUrl : auth.currentUser.photoURL,
        userEmail : auth.currentUser.email,
        author : auth.currentUser.displayName,
        timestamp : firebasestore.FieldValue.serverTimestamp(),
        question : question.question,
        tags : question.tags,
        upvotes : {},
        downvotes : {},
        upvoteCounter : 0,
        downvoteCounter : 0
    })
    .then(dispatch(fetchQuestions()))
    .catch(error => dispatch(questionsFailed(error.message)));
}

export const deleteQuestion = (questionID) => async(dispatch) => {
    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    await firestore.collection('questions').doc(questionID).delete();
    await firestore.collection('answers').doc(questionID).collection('answers').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                firestore.collection('answers').doc(questionID).collection('answers').doc(doc.id).delete();
            });
        })
    dispatch(fetchQuestions());
}

export const updateQuestion = async(question)=>{

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    await firestore.collection('questions').doc(question.questionID).update(question);
}

export const questionsLoading = () => ({
    type: ActionTypes.QUESTIONS_LOADING
});

export const questionsFailed = () => ({
    type : ActionTypes.QUESTIONS_FAILURE
});
export const addQuestions = (questions) =>({
    type : ActionTypes.ADD_QUESTIONS,
    payload : questions
});
/*******************************************************************************************************************/
/*********************************************ANSWERS-REQUESTS*****************************************************/
export const fetchAnswers = (questionID)=>(dispatch)=>{
    dispatch(answersLoading());
        firestore.collection('answers').doc(questionID).collection('answers').get()
        .then(snapshot => {
            let answers=[];
            snapshot.forEach(doc => {
                answers.push(doc.data());
            });
            return answers;
        })
    .then(ans => dispatch(addAnswers(ans)))
    .catch(error => dispatch(answerFailed(error.message)));
}


export const postAnswer = (answer,questionID) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    var newDocRef = firestore.collection('answers').doc(questionID).collection('answers').doc();
    newDocRef.set({
        answer : answer,
        answerID : newDocRef.id,
        author : auth.currentUser.displayName,
        photoUrl : auth.currentUser.photoURL,
        userEmail : auth.currentUser.email,
        timestamp : firebasestore.FieldValue.serverTimestamp(),
        upvotes : {},
        downvotes : {},
        upvoteCounter : 0,
        downvoteCounter : 0
    })
    .then(dispatch(fetchAnswers(questionID)))
    .catch(error => dispatch(answerFailed(error.message)));
}

export const deleteAnswer = (questionID,answerID) => async(dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    await firestore.collection('answers').doc(questionID).collection('answers').doc(answerID).delete()
    dispatch(fetchAnswers(questionID))
}
export const updateAnswer = async(questionID,answerID,answer)=>{

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    await firestore.collection('answers').doc(questionID).collection('answers').doc(answerID).update(answer);
}

export const answersLoading = () => ({
    type: ActionTypes.ANSWERS_LOADING
});

export const answerFailed = () => ({
    type : ActionTypes.ANSWERS_FAILURE
});
export const addAnswers = (answers) =>({
    type : ActionTypes.ADD_ANSWERS,
    payload : answers
});



/*******************************************************************************************************************/