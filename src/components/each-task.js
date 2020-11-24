import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneAllIcon from '@material-ui/icons/DoneAll';
function EachTask(props)
{
    function handleDel(taskID) {
        props.deleteTask(taskID);
      }
    function handleDone(taskID,status)
    {
        props.doneTask(taskID,status);
    }

    return (
        <div className="row m-auto">
        {props.tasks.map( (task) =>{
            return(
                <div className="col-12 col-md-3 task-style" key={task._id}>
            <div className={task.done?"task-done":"task"} >
                <h1 className="task-h1">{task.title}</h1>
                <p className="task-p">{task.content}</p>
                <div className="row">
                    <div className="col-6 align">
                    <button className="task-btn" onClick={()=>handleDone(task._id,!task.done)}><DoneAllIcon /></button>
                    </div>
                    <div className="col-6 align-2">
                    <button className="task-btn" onClick={()=>handleDel(task._id)}><DeleteIcon /></button>
                    </div>
                </div>
                
                
            </div>
            </div>
        )})
        }
        </div>
    )
}
export default EachTask;
