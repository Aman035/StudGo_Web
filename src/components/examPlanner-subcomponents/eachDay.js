import React ,{useState}from 'react';
import EditIcon from '@material-ui/icons/Edit';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import Chip from '@material-ui/core/Chip';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import EditDay from './editDay';
const useStyles = makeStyles(() => ({
    root: {
        margin : 'auto',
        maxWidth: 700,
        borderRadius: 20,
        backgroundColor: '#a3a29d',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/gplay.png")'
      },
      content: {
        padding: 24,
      },
    }));
  
function EachDay(props){
    const shadowStyles = useLightTopShadowStyles();
    const cardStyles = useStyles();

    
    const [edit,Setedit] = useState(false);

    function editDone()
    {
        Setedit(false);
    }
    return (
        
        <Card className={cx(cardStyles.root, shadowStyles.root)}>
            <CardContent className="questions">
            {!edit?
                <div>
                <center><h4>Day {props.day.day}</h4></center>
                {
                    props.day.subjects.map(sub=>{
                        return (
                            <div className="row m-0">
                                <div className="col-12">
                                    <h5>{sub.subject}</h5>
                                    <p>{sub.topic}</p>
                                    {sub.priority?
                                    <Chip
                                    className ="margin-c"
                                    label="High Priority"
                                    color="secondary"/>:null
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                    <Button style={{color:green[800],fontSize : '90%'}} onClick={()=>Setedit(true)}>
                        Edit <EditIcon/>
                    </Button>
            </div>
            :
            <EditDay id={props.id} subjects={props.subjects} editdone={editDone}/>
            }    
            </CardContent>
    </Card>
  );
}


export default EachDay;
