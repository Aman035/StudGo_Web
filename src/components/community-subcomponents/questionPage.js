import React,{useState,useEffect} from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import Answers from './answers';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import Chip from '@material-ui/core/Chip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { withRouter } from 'react-router-dom';
import {updateQuestion} from '../../redux/ActionCreators';
const useStyles = makeStyles(() => ({
  root: {
    margin : 'auto',
    Width: 900,
    maxWidth : '90%',
    borderRadius: 20,
  },
  content: {
    padding: 24,
  },
}));
function Question(props) {
  const shadowStyles = useLightTopShadowStyles();
  const cardStyles = useStyles();

  const[vote,setVote] = useState(0);

  useEffect(() => {
      if(props.auth.isAuthenticated && props.question.upvotes[props.auth.user.email] === true)
        setVote(1);
      else{
        if(props.auth.isAuthenticated && props.question.downvotes[props.auth.user.email] === true)
          setVote(-1);
      }
  }, []);

  function handleUpvotes(question,auth){
      if(auth.isAuthenticated)
      {
          var user = auth.user.email;
          var upvote = question.upvotes[user];
          if(upvote === undefined || upvote === false)
          {
              question.upvotes[user] = true;
              setVote(1);
              question.upvoteCounter+=1;
              if(question.downvotes[user] === true){
                question.downvotes[user] = false;
                question.downvoteCounter-=1;
              }

          }
          else
          {
              question.upvotes[user] = false;
              setVote(0);
              question.upvoteCounter-=1;
          }
          updateQuestion(question);
      }
  }

  function handleDownvotes(question,auth){
    if(auth.isAuthenticated)
    {
        var user = auth.user.email;
        var downvote = question.downvotes[user];
        if(downvote === undefined || downvote === false)
        {
            question.downvotes[user] = true;
            setVote(-1);
            question.downvoteCounter+=1;
            if(question.upvotes[user] === true){
              question.upvotes[user] = false;
              question.upvoteCounter-=1;
            }
        }
        else
        {
          question.downvotes[user] = false;
          setVote(0);
          question.downvoteCounter-=1;
        }
        updateQuestion(question);
    }
}





    function deleteQuestion(){
      props.deleteQuestion(props.question.questionID);
      props.history.push('/community');
    }


  return (
    <div className="cphead">
    <Card className={cx(cardStyles.root, shadowStyles.root)}>
      <BrandCardHeader
        image={
          props.question.photoUrl
        }
      />
      <CardContent className={cardStyles.content}>
      <h6><i>Asked By {props.question.author}</i></h6>
      <div>
          <p>
            {
                props.question.question.split('\n').map(function(item) {
            return (
                <span>
                {item}
                <br/>
                </span>
            )
            })}
          </p>
      </div>
        {props.question.tags!== ""?
        <div>
        {
            props.question.tags.split(',').map(function(item) {
          return (
            <Chip
            className ="margin-c"
            label={item}
            color="secondary"/>
            )})}
        </div>
        :null}
        {props.auth.isAuthenticated?
        <div className="row">
            <div className="col-4">
            {
                props.question.userEmail === props.auth.user.email?
                <DeleteForeverIcon onClick={deleteQuestion}/>:null
            }
            </div>
            <div className="align-2 col-8">
                <div className="row">
                    <div className="col-9 col-md-11">
                        <ArrowUpwardIcon color={vote===1?"secondary":""} onClick={()=>handleUpvotes(props.question,props.auth)}/>
                    </div>
                    <div className="col-3 col-md-1 align">
                        <h5>{props.question.upvoteCounter}</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-9 col-md-11">
                        <ArrowDownwardIcon color={vote===-1?"secondary":""} onClick={()=>handleDownvotes(props.question,props.auth)}/>
                    </div>
                    <div className="col-3 col-md-1 align">
                        <h5>{props.question.downvoteCounter}</h5>
                    </div>
                </div>
            </div>
        </div>
        :null}
      </CardContent>
    </Card>
    <Answers questionID={props.question.questionID} auth={props.auth}/>
    </div>
  );
};

export default withRouter(Question);