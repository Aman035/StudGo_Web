import React, { Component } from 'react';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import HomeComponent from './home-component';
import NewsComponent from './news-component';
import CpComponent from './cp-component';
import Header from './header-component';
import {googleLogin,logoutUser,checkUser,fetchNews ,fetchCompetitions , fetchQuiz , fetchBlog} from '../redux/ActionCreators'
import { connect } from 'react-redux';
import TaskComponent from './task-component';
import BlogComponent from './blog-component';
import OSComponent from './OS-component';
import FullBlog from './fullBlog';
const mapStateToProps = state => {
    return {
      auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser()),
    googleLogin: () => dispatch(googleLogin()),
    checkUser: () => dispatch(checkUser()),
    fetchNews: () =>dispatch(fetchNews()),
    fetchCompetitions : ()=>dispatch(fetchCompetitions()),
    fetchQuiz : ()=>dispatch(fetchQuiz()),
    fetchBlog : ()=>dispatch(fetchBlog())
  });
  
class Main extends Component{

   async componentDidMount(){
        this.props.checkUser();
        this.props.fetchCompetitions();
        this.props.fetchNews();
        this.props.fetchQuiz();
        this.props.fetchBlog();
    }

    componentWillUnmount(){
        this.props.logoutUser();
    }

    render(){

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.auth.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/home',
                    state: { from: props.location }
                  }} />
            )} />
        );

        return(
            <div>
                <Header auth={this.props.auth}
                    logoutUser={this.props.logoutUser}
                    googleLogin={this.props.googleLogin}/>
                <Switch>
                    <Route path='/home' component={HomeComponent}/>
                    <Route path='/news' component={NewsComponent}/>
                    <PrivateRoute path='/cp' component={CpComponent}/>
                    <PrivateRoute path='/task' component={TaskComponent}/>
                    <PrivateRoute path='/share' component={BlogComponent}/>
                    <Route path='/blog/:id' component={FullBlog}/>
                    <PrivateRoute path='/open' component={OSComponent}/>
                    <Redirect to='/home'/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

