import React from 'react';
import {connect} from 'react-redux';
import EachQuestion from './eachquestion';
import {Link} from 'react-router-dom';
import { Fab,Zoom } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import IsLoading from '../loading-component';
const mapStateToProps = state => {
    return {
      questions: state.questions
    }
}
class Questions extends React.Component{
    render(){
        return(
            <div>
                {this.props.questions.isLoading?<IsLoading/>:
                <div>
                    <div className="row cphead">
                            {
                                this.props.questions.questions.map(question=>{
                                    return (<EachQuestion key={question.questionID} question={question}/>)
                                })
                            }
                    </div>
                    <div className="addpro"> 
                    <Zoom in={true} >
                        <Fab>
                            <Link to="/addquestion"><AddIcon/></Link>
                        </Fab>
                    </Zoom>
                    </div>
                </div>
                }
            </div>
        )
    }
}
export default connect(mapStateToProps)(Questions);