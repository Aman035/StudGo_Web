import React from 'react';
import {postQuestion} from '../../redux/ActionCreators';
import {connect} from 'react-redux';
import QuestionForm from './questionForm';
const mapStateToProps = state =>({
    questions : state.questions
})
const mapDispatchToProps = (dispatch) => ({
        postQuestion : (question)=> dispatch(postQuestion(question))
  });

class AddQuestion extends React.Component{
    render(){
        return(
            <QuestionForm postQuestion={this.props.postQuestion}/>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddQuestion);