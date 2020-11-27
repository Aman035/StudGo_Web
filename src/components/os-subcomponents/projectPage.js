import React,{useState,useEffect} from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import Chip from '@material-ui/core/Chip';
import {updateProject} from '../../redux/ActionCreators';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {withRouter} from 'react-router-dom';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
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
function ProjectCard(props) {
  const styles = useN03TextInfoContentStyles();
  const shadowStyles = useLightTopShadowStyles();
  const cardStyles = useStyles();

    const[vote,setVote] = useState(0);

    useEffect(() => {
        if(props.auth.isAuthenticated && props.project.upvotes[props.auth.user.email] === true)
          setVote(1);
        else{
          if(props.auth.isAuthenticated && props.project.downvotes[props.auth.user.email] === true)
            setVote(-1);
        }
    }, []);

    function handleUpvotes(project,auth){
        if(auth.isAuthenticated)
        {
            var user = auth.user.email;
            var upvote = project.upvotes[user];
            if(upvote === undefined || upvote === false)
            {
                project.upvotes[user] = true;
                setVote(1);
                project.upvoteCounter+=1;
                if(project.downvotes[user] === true){
                  project.downvotes[user] = false;
                  project.downvoteCounter-=1;
                }

            }
            else
            {
                project.upvotes[user] = false;
                setVote(0);
                project.upvoteCounter-=1;
            }
            updateProject(project);
        }
    }

    function handleDownvotes(project,auth){
      if(auth.isAuthenticated)
      {
          var user = auth.user.email;
          var downvote = project.downvotes[user];
          if(downvote === undefined || downvote === false)
          {
              project.downvotes[user] = true;
              setVote(-1);
              project.downvoteCounter+=1;
              if(project.upvotes[user] === true){
                project.upvotes[user] = false;
                project.upvoteCounter-=1;
              }
          }
          else
          {
            project.downvotes[user] = false;
            setVote(0);
            project.downvoteCounter-=1;
          }
          updateProject(project);
      }
  }

    function deleteProject(){
      props.deleteProject(props.project.projectID);
      props.history.push('/open');
    }


  return (
    <div className="cphead">
        
 <Card className={cx(cardStyles.root, shadowStyles.root)}>
       <BrandCardHeader
        image={
          props.project.photoUrl
        }
      />
      <CardContent className={cardStyles.content}>
        <TextInfoContent
          classes={styles}
          className ="blog"
          overline={"Author : "+props.project.author}
          heading={props.project.title}
          body={
            props.project.content.split('\n').map(function(item) {
          return (
            <span>
              {item}
              <br/>
            </span>
          )
        })}
        />
        <div>
          <a href={props.project.link}>Go to Project</a>
        </div>
        {props.project.tags!== ""?
        <div>
        {
            props.project.tags.split(',').map(function(item) {
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
            props.project.userEmail === props.auth.user.email?
            <DeleteForeverIcon onClick={deleteProject}/>:null
          }
        </div>
        <div className="align-2 col-8">
        <div className="row">
          <div className="col-9 col-md-11">
            <ArrowUpwardIcon color={vote===1?"secondary":""} onClick={()=>handleUpvotes(props.project,props.auth)}/>
          </div>
          <div className="col-3 col-md-1 align">
            <h5>{props.project.upvoteCounter}</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-9 col-md-11">
            <ArrowDownwardIcon color={vote===-1?"secondary":""} onClick={()=>handleDownvotes(props.project,props.auth)}/>
          </div>
          <div className="col-3 col-md-1 align">
            <h5>{props.project.downvoteCounter}</h5>
          </div>
        </div>
        </div>
        </div>
        :null}
      </CardContent>
    </Card>
    </div>
  );
};

export default withRouter(ProjectCard);
