import React , {useState}from 'react';
import {connect} from 'react-redux';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import {postComment,fetchComments,deleteComment} from '../redux/ActionCreators';
import Load from './loading-component';
import AddIcon from "@material-ui/icons/Add";
import { Fab,Zoom } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const mapStateToProps = state => {
    return {
      comments : state.comments,
      auth : state.auth
    }
  }

const mapDispatchToProps = (dispatch) => ({
   postComment: (comment,blogID) => dispatch(postComment(comment,blogID)),
   fetchComments: (blogID) => dispatch(fetchComments(blogID)),
   deleteComment: (blogID,commentID) => dispatch(deleteComment(blogID,commentID))
});

const useStyles = makeStyles(() => ({
    root: {
      margin : 'auto',
      marginTop :1,
      maxWidth: 1000,
      borderRadius: 20,
    },
    content: {
      padding:  10,
    },
  }));
  
function AllComments(props){
    const styles = useN03TextInfoContentStyles();
    const shadowStyles = useLightTopShadowStyles();
    const cardStyles = useStyles();
    return (
        <Card className={cx(cardStyles.root, shadowStyles.root)}>
          <CardContent className={cardStyles.content}>
              <TextInfoContent
                classes={styles}
                body={
                  <div className="container">
                    <div className="row">
                        <div className="col-1 align-2">
                          <img src={props.comment.photoUrl} className="profilePic" alt="comment"/>
                        </div>
                        <div className="col-7">
                            {props.comment.comment}
                        </div>
                        <div className="align-2 col-3">
                                By-{props.comment.displayName}
                        </div>
                        <div className="col-1 align-2">
                          {
                            props.auth.isAuthenticated && props.auth.user.email === props.comment.userEmail?
                            <DeleteForeverIcon onClick={()=>props.deleteComment(props.blogID,props.comment.commentID)}/>:null
                          }
                        </div>
                    </div>
                    </div>
                    }
              />
          </CardContent>
        </Card>
  );
}


function AddCommentComp(props){

    const [comment, setComment] = useState("");
    
    function submitComment(event){
      event.preventDefault();
        props.postComment(comment,props.blogID);
        setComment("");

    }

      function handleChange(event) {
        const value = event.target.value;
        setComment(value);
      }

    return (
        <div className="row m-0">
          <div className="col-12 col-md-8 offset-md-2">
            <form  className="create-task">
                <input
                  name="comment"
                  onChange={handleChange}
                  value={comment}
                  placeholder="Add Comment"/>
                <div className="align-2">
                  <Zoom in={true}>
                    <Fab type="submit" onClick={submitComment}>
                      <AddIcon />
                    </Fab>
                  </Zoom>
                </div>
            </form>
          </div>
        </div>
  );
}


class Comments extends React.Component{
    componentDidMount(){
        this.props.fetchComments(this.props.blogID)
    }
    render(){
        return(
        <div>
            {this.props.comments.isLoading || this.props.comments.comments ===null?
            <Load/>:
            <div className="cphead">
              {this.props.auth.isAuthenticated?
                <AddCommentComp postComment={this.props.postComment} blogID = {this.props.blogID}/>:null}
                {
                    this.props.comments.comments.map(comment=>{
                    return <AllComments comment={comment} auth ={this.props.auth} key={comment._id} deleteComment={this.props.deleteComment} blogID = {this.props.blogID}/>})
                }
            </div>
            }
        </div>
        )
}}
export default connect(mapStateToProps,mapDispatchToProps)(Comments);
            