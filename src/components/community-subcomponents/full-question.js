import React from 'react';
import {connect} from 'react-redux'
import {deleteQuestion} from '../../redux/ActionCreators'
import Load from '../loading-component';
import QuestionPage from './questionPage';
const mapStateToProps = state => {
    return {
      questions : state.questions,
      auth : state.auth
    }
}
const mapDispatchToProps = (dispatch) => ({
   deleteQuestion: (id) => dispatch(deleteQuestion(id))
  });

class FullQuestion extends React.Component{
    render(){
        return (
            <div>
                {this.props.questions.isLoading || this.props.questions.errmess || this.props.questions.questions === undefined || !this.props.questions.questions.length?
                <Load/>:
                <QuestionPage 
                question={this.props.questions.questions.filter(question => question.questionID === this.props.match.params.id)[0]} 
                auth={this.props.auth}
                deleteQuestion = {this.props.deleteQuestion}
                />}
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FullQuestion);