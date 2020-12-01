import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab,Zoom } from "@material-ui/core";
import Tasks from './each-task';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {postTask, fetchTasks ,deleteTask , doneTask} from '../redux/ActionCreators'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      tasks : state.tasks
    }
}

const mapDispatchToProps = (dispatch) => ({
    postTask : (task) => dispatch(postTask(task)),
    deleteTask : (taskID) => dispatch(deleteTask(taskID)),
    fetchTasks : () =>dispatch(fetchTasks()),
    doneTask : (taskID,status) =>dispatch(doneTask(taskID,status))
  });

function CreateArea(props) {
  const [task, setTask] = useState({
    title: "",
    content: ""
  });
  function handleChange(event) {
    const { name, value } = event.target;

    setTask(prevTask => {
      return {
        ...prevTask,
        [name]: value
      };
    });
  }

  function submitTask(event) {
    props.postTask(task);
    setTask({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  const [isClicked, SetClicked] = useState(false);

  function handletaskclick() {
    SetClicked(true);
  }

  return (
    <div>
    <div className="row m-0">
      <div onClick={handletaskclick} className="col-10 col-md-6 offset-1 offset-md-3">
        <form className="create-task">
          {isClicked && (
            <input
              name="title"
              onChange={handleChange}
              value={task.title}
              placeholder="Title"
            />
          )}
          <textarea
            name="content"
            onChange={handleChange}
            value={task.content}
            placeholder="Add a Task..."
            rows={isClicked ? 3 : 1}
          />
          <div className="align-2">
          <Zoom in={isClicked}>
            <Fab onClick={submitTask}>
              <AddIcon />
            </Fab>
          </Zoom>
          </div>
        </form>
      </div>
      </div>
      {
        props.isLoading?
        <div className="row loadingRow">
          <div className="col-4 offset-4">
            <span className="fa fa-4x fa-spinner fa-pulse fa-fw"></span>
          </div>
        </div>
        :
          props.tasks.length?
            <Tasks tasks={props.tasks} deleteTask = {props.deleteTask} doneTask = {props.doneTask}/>:
            <div className="align-3">
            <AssignmentIcon className="no-task"/>
            <h3 className="pending">No Pending Tasks</h3>
            </div>
            
      }
      
    </div>
  );
}

class Task extends React.Component{


  render()
  {
    return <CreateArea 
    tasks = {this.props.tasks.tasks}
    postTask = {this.props.postTask}
    doneTask = {this.props.doneTask}
    deleteTask = {this.props.deleteTask}
    isLoading = {this.props.tasks.isLoading}
    errmess = {this.props.tasks.errmess}/>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
