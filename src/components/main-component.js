import React, { Component } from 'react';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import HomeComponent from './home-component';
import NewsComponent from './news-component';
import Header from './header-component';
import {googleLogin,logoutUser, postTask, fetchTasks ,deleteTask , doneTask ,checkUser,fetchNews} from '../redux/ActionCreators'
import { connect } from 'react-redux';
import TaskComponent from './task-component';
const mapStateToProps = state => {
    return {
      auth: state.auth,
      tasks : state.tasks,
      news : state.news
    }
}

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser()),
    googleLogin: () => dispatch(googleLogin()),
    postTask : (task) => dispatch(postTask(task)),
    deleteTask : (taskID) => dispatch(deleteTask(taskID)),
    fetchTasks : () =>dispatch(fetchTasks()),
    doneTask : (taskID,status) =>dispatch(doneTask(taskID,status)),
    checkUser: () => dispatch(checkUser()),
    fetchNews: async()=> await dispatch(fetchNews())
  });
  
class Main extends Component{

    componentDidMount(){
        this.props.checkUser();
        this.props.fetchNews();
    }

    componentWillUnmount(){
        this.props.logoutUser();
    }

    render(){
        return(
            <div>
            <Header auth={this.props.auth}
                logoutUser={this.props.logoutUser}
                googleLogin={this.props.googleLogin}/>
            <Switch>
                <Route path='/home' component={HomeComponent}/>
                {this.props.auth.isAuthenticated?
                    <Route path='/task' component={() => <TaskComponent 
                    tasks = {this.props.tasks.tasks}
                    postTask = {this.props.postTask}
                    doneTask = {this.props.doneTask}
                    deleteTask = {this.props.deleteTask}
                    isLoading = {this.props.tasks.isLoading}
                    errmess = {this.props.tasks.errmess}
                     />}/>:null
                }
                <Route path='/news' component={() => <NewsComponent 
                news = {this.props.news.news}
                isLoading = {this.props.news.isLoading}
                errmess = {this.props.news.errmess}
                    />}/>
                <Redirect to='/home'/>
            </Switch>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

