import React from 'react';
import Card from './card-component';
import { connect } from 'react-redux';
import {postTask} from '../../redux/ActionCreators';
const mapStateToProps = state => {
    return {
      competitions : state.competitions
    }
}
const mapDispatchToProps = (dispatch) => ({
    postTask : (task) => dispatch(postTask(task)),
  });
  
function Competitions(props){
    return (
        <div>
        {props.isLoading||props.comp === null||props.comp.length < 4?
            <div className="row loadingRow">
                    <div className="col-4 offset-4">
                    <span className="fa fa-4x fa-spinner fa-pulse fa-fw"></span>
                    </div>
            </div>:
            <div className="container-fluid">
                <div className="row cpguide">
                    <div className="col-12">
                        <Card img="/assets/images/cp/7.png" comp={props.comp[0]} addTask = {props.addTask}/>
                    </div>
                </div>
                <div className="row cpguide">
                    <div className="col-12">
                        <Card img="/assets/images/cp/8.jpg" comp={props.comp[1]} addTask = {props.addTask}/>
                    </div>
                </div>
                <div className="row cpguide">
                    <div className="col-12">
                        <Card img="/assets/images/cp/9.jpg" comp={props.comp[2]} addTask = {props.addTask}/>
                    </div>
                </div>
                <div className="row cpguide">
                    <div className="col-12">
                        <Card img="/assets/images/cp/10.jpg" comp={props.comp[3]} addTask = {props.addTask}/>
                    </div>
                </div>
            </div>
        }
        </div>
    )
}

class ComComponent extends React.Component{
    render(){
        return(
        <Competitions
            comp = {this.props.competitions.competitions}
            isLoading = {this.props.competitions.isLoading}
            errmess = {this.props.competitions.errmess}
            addTask = {this.props.postTask}
        />
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ComComponent);