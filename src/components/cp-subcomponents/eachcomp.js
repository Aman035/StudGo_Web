import React ,{useState} from 'react';
import TimerIcon from '@material-ui/icons/Timer';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FlagIcon from '@material-ui/icons/Flag';
import { green } from '@material-ui/core/colors';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import DoneAllIcon from '@material-ui/icons/DoneAll';
function EachComp(props){

    function alertSet(){
        setAlert(true);
        setTimeout(() => {
            setAlert(false)
            }, 3000);
  }

    function submitTask(title)
    {
        var task={
            title : title,
            content : "Competitive Coding Contest"
        }
        props.addTask(task);
       alertSet();
    }

    const [alert,setAlert] = useState(false);

    return(
        <div className="eachComp">
            
            <h5 style={{color : green[500]}}>{props.comp.event}</h5>
            <div className ="row m-0">
                <div className="col-md-4 col-6 mt-4">
                    <PlayCircleFilledIcon/>
                    <h6>{props.comp.start.split('T')[0]}</h6>
                    <h6>{props.comp.start.split('T')[1]}</h6>
                </div>
                <div className="col-md-4 col-6 mt-4">
                    <FlagIcon/>
                    <h6>{props.comp.end.split('T')[0]}</h6>
                    <h6>{props.comp.end.split('T')[1]}</h6>
                </div>
                <div className="col-md-4 col-12 mt-4">
                    <TimerIcon/>
                    <h6>{props.comp.duration/3600} H</h6>
                </div>
                <div className="col-md-3 col-6 offset-md-3 mt-4">
                    <a href={props.comp.href}><TouchAppIcon/>Visit</a>
                </div>
                <div className="col-md-3 col-6 mt-4">
                    <Button style={{color : 'white'}} onClick={()=>submitTask(props.comp.event)}><AddCircleIcon/> Add as Task {alert?<DoneAllIcon style={{color : green[500]}}/>:null}</Button>
                </div>
                
            </div>
            
        </div>
    )
}
export default EachComp;