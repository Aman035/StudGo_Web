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
import { withRouter } from 'react-router-dom';
const useStyles = makeStyles(() => ({
  root: {
    margin : 'auto',
    maxWidth: 1100,
    borderRadius: 20,
  },
  content: {
    padding: 24,
  },
}));
function Question(props) {
  const shadowStyles = useLightTopShadowStyles();
  const cardStyles = useStyles();


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
        {/* {!liked?
        <FavoriteBorderIcon onClick={()=>handleLike(props.blog,props.auth)}/>:
        <FavoriteIcon  onClick={()=>handleLike(props.blog,props.auth)}/>
         } */}
         {/* <h3>{likes}</h3> */}
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