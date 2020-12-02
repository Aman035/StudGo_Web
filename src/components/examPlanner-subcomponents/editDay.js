import React,{useState} from 'react';
import { Fab,Zoom } from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import AddIcon from "@material-ui/icons/Add";
import Chip from '@material-ui/core/Chip';



function EditDay(props){
    const [subject,setSubject] = useState({subject :"",priority:false,topics:""});
    
    function handleChange(event) {
        const { name, value } = event.target;
    
        setSubject(prevsub => {
          return {
            ...prevsub,
            [name]: value
          };
        });
      }

      function setPriority(){
        setSubject(prevsub => {
          return {
            ...prevsub,
            priority : !subject.priority
          };
        });
      }
      function submitSubject(event) {
        props.day.subjects.push(subject);
        props.updateSubject(props.day.subjects,props.id,props.day.day);
        props.editDone(props.day.subjects);
        event.preventDefault();
      }

    return (
        <div>
            <form className="create-task">
            <input
                name="subject"
                onChange={handleChange}
                value={subject.subject}
                placeholder="Subject Name"
            />
            <textarea
                name="topics"
                onChange={handleChange}
                value={subject.topics}
                placeholder="Add topics"
                rows={6}
            />
            <Chip
                variant={subject.priority?"default":"outlined"}
                className ="margin-c"
                label="High Priority"
                color="secondary"
                onClick={setPriority}
            />
            <div className="align-2">
                <Zoom in={true}>
                    <Fab onClick={submitSubject}>
                    <AddIcon />
                    </Fab>
                </Zoom>
            </div>
        </form>
        </div>
    )
}
export default EditDay;