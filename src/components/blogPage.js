import React,{useState,useEffect} from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Chip from '@material-ui/core/Chip';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {updateBlog} from '../redux/ActionCreators';
import Comments from './comments';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {withRouter} from 'react-router-dom';
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


    var date =props.blog.createdAt;

    if(date !==null)
    {
      date = new Date(date.seconds*1000 + 19800000)
      date = date.toISOString().split('T')[0];
    }
    else
    {
      date = new Date()
      date = date.toISOString().split('T')[0];
    }

    const[liked,setLiked] = useState(false);
    const[likes,setLikes] = useState(0);

    useEffect(() => {
        if(props.auth.isAuthenticated && props.blog.likes[props.auth.user.email] === true)
        setLiked(true);

        for (const [key, value] of Object.entries(props.blog.likes)) {
          if(value === true)setLikes(likes+1);
      }
    }, []);




    function handleLike(blog,auth){
        if(!auth.isAuthenticated)
        {   
        }
        else
        {
            var user = auth.user.email;
            var like = blog.likes[user];
            if(like === undefined || like === false)
            {
                blog.likes[user] = true;
                setLiked(true);
                setLikes(likes+1);
            }
            else
            {
                blog.likes[user] = false;
                setLiked(false);
                setLikes(likes-1);
            }
            updateBlog(blog);
        }
        
    }

    function deleteBlog(){
      props.deleteBlog(props.blog.blogID);
      props.history.push('/share');
    }


  return (
    <div className="cphead">
    <Card className={cx(cardStyles.root, shadowStyles.root)}>
      <BrandCardHeader
        image={
          props.blog.photo
        }
        extra={date}
      />
      <CardContent className={cardStyles.content}>
        <TextInfoContent
          classes={styles}
          className ="blog"
          overline={"Author : "+props.blog.author}
          heading={props.blog.title}
          body={
            props.blog.content.split('\n').map(function(item) {
          return (
            <span>
              {item}
              <br/>
            </span>
          )
        })}
        />
        {props.blog.tags!== ""?
        <div>
        {
            props.blog.tags.split(',').map(function(item) {
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
            props.blog.blogWriter === props.auth.user.email?
            <DeleteForeverIcon onClick={deleteBlog}/>:null

          }
        </div>
        <div className="align-2 col-8">
        {!liked?
        <FavoriteBorderIcon onClick={()=>handleLike(props.blog,props.auth)}/>:
        <FavoriteIcon  onClick={()=>handleLike(props.blog,props.auth)}/>
         }
         <h3>{likes}</h3>
        </div>
        </div>
        :null}
      </CardContent>
    </Card>
    <Comments blogID={props.blog.blogID} auth={props.auth}/>
    </div>
  );
};

export default withRouter(ProjectCard);