import React from 'react';
import {connect} from 'react-redux';
import Load from '../loading-component';
import StartQuiz from './start-quiz'
const mapStateToProps = state => {
    return {
      quiz : state.quiz
    }
}
function GitQuiz(props){
    return (
    <div className="container align-c">
        <h5 className="cp cphead">Git and Github is a very important topic for starting OpenSource Contribution.
        This Challange will help you to learn some basic commands within no time</h5>
        {
            props.isLoading||props.quiz === null || !props.quiz.length ?
            <Load/>:
            <StartQuiz quiz = {props.quiz}/> 
        }
    </div>

    )
}

class Quiz extends React.Component{
    render(){
        return(
            <GitQuiz quiz = {this.props.quiz.quiz}
            isLoading = {this.props.quiz.isLoading}
            errmess = {this.props.quiz.errmess}/>
        )
    }
}
export default connect(mapStateToProps)(Quiz);