import React ,{useState,useEffect}from 'react';
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
import { connect } from 'react-redux';
import {updateSubject,deleteSubject} from '../../redux/ActionCreators';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const mapDispatchToProps = (dispatch) => ({
        deleteSub : (id,day,subjectName,subjects)=>dispatch(deleteSubject(id,day,subjectName,subjects))
  });

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
    const [sub,setSub] = useState(props.day.subjects);
    function editDone ()
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
                                    <p>{sub.topics}</p>
                                    {sub.priority?
                                    <Chip
                                    className ="margin-c"
                                    label="High Priority"
                                    color="secondary"/>:null
                                    }
                                    <div className="row">
                                        <div className="col-4">
                                            <DeleteForeverIcon onClick={
                                                ()=>{let allsub =props.deleteSub(props.id,props.day.day,sub.subject,props.day.subjects);
                                                        setSub(allsub);
                                                }
                                                }
                                                />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                    <Button style={{color:green[800],fontSize : '90%'}} onClick={()=>Setedit(true)}>
                        Add Subject
                    </Button>
            </div>
            :
            <EditDay id={props.id} day={props.day} editDone={editDone} updateSubject={updateSubject}/>
            }    
            </CardContent>
    </Card>
  );
}


export default connect(null,mapDispatchToProps)(EachDay);
