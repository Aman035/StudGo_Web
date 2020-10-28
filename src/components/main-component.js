import React, { Component } from 'react';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import HomeComponent from './home-component';
import NewsComponent from './news-component';
import CpComponent from './cp-component';
import Header from './header-component';
import {googleLogin,logoutUser, postTask,checkUser,fetchNews ,fetchCompetitions} from '../redux/ActionCreators'
import { connect } from 'react-redux';
import TaskComponent from './task-component';
const mapStateToProps = state => {
    return {
      auth: state.auth,
      news : state.news,
      competitions : state.competitions
    }
}

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser()),
    googleLogin: () => dispatch(googleLogin()),
    postTask : (task) => dispatch(postTask(task)),
    checkUser: () => dispatch(checkUser()),
    fetchNews: async()=> await dispatch(fetchNews()),
    fetchCompetitions : ()=>dispatch(fetchCompetitions())
  });
  
class Main extends Component{

    componentDidMount(){
        this.props.checkUser();
        this.props.fetchCompetitions();
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
                <Route path='/cp' component={() => <CpComponent
                    comp = {this.props.competitions.competitions}
                    isLoading = {this.props.competitions.isLoading}
                    errmess = {this.props.competitions.errmess}
                    postTask = {this.props.postTask}
                    />}/>:null
                }
                {this.props.auth.isAuthenticated?
                    <Route path='/task' component={() => <TaskComponent 
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

