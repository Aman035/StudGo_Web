import React , {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import {postAnswer,fetchAnswers,deleteAnswer,updateAnswer} from '../../redux/ActionCreators';
import Load from '../loading-component';
import AddIcon from "@material-ui/icons/Add";
import { Fab,Zoom } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const mapStateToProps = state => {
    return {
      answers : state.answers,
      auth : state.auth
    }
  }

const mapDispatchToProps = (dispatch) => ({
   postAnswer: (answer,questionID) => dispatch(postAnswer(answer,questionID)),
   fetchAnswers: (questionID) => dispatch(fetchAnswers(questionID)),
   deleteAnswer: (questionID,answerID) => dispatch(deleteAnswer(questionID,answerID))
});

const useStyles = makeStyles(() => ({
    root: {
      margin : 'auto',
      marginTop :40,
      Width: 800,
      maxWidth :'80%',
      borderRadius: 50,
      backgroundColor: '#a3a29d',
      backgroundImage: 'url("https://www.transparenttextures.com/patterns/gplay.png")'
    },
    content: {
      padding:  10,
    },
  }));
  
function AllAnswers(props){
    const shadowStyles = useLightTopShadowStyles();
    const cardStyles = useStyles();

    const[vote,setVote] = useState(0);

    useEffect(() => {
        if(props.auth.isAuthenticated && props.answer.upvotes[props.auth.user.email] === true)
          setVote(1);
        else{
          if(props.auth.isAuthenticated && props.answer.downvotes[props.auth.user.email] === true)
            setVote(-1);
        }
    }, []);
  
    function handleUpvotes(answer,auth){
        if(auth.isAuthenticated)
        {
            var user = auth.user.email;
            var upvote = answer.upvotes[user];
            if(upvote === undefined || upvote === false)
            {
                answer.upvotes[user] = true;
                setVote(1);
                answer.upvoteCounter+=1;
                if(answer.downvotes[user] === true){
                  answer.downvotes[user] = false;
                  answer.downvoteCounter-=1;
                }
  
            }
            else
            {
                answer.upvotes[user] = false;
                setVote(0);
                answer.upvoteCounter-=1;
            }
            updateAnswer(props.questionID,props.answer.answerID,answer);
        }
    }
  
    function handleDownvotes(answer,auth){
      if(auth.isAuthenticated)
      {
          var user = auth.user.email;
          var downvote = answer.downvotes[user];
          if(downvote === undefined || downvote === false)
          {
              answer.downvotes[user] = true;
              setVote(-1);
              answer.downvoteCounter+=1;
              if(answer.upvotes[user] === true){
                answer.upvotes[user] = false;
                answer.upvoteCounter-=1;
              }
          }
          else
          {
            answer.downvotes[user] = false;
            setVote(0);
            answer.downvoteCounter-=1;
          }
          updateAnswer(props.questionID,props.answer.answerID,answer);
      }
  }
  
  
  
  
  
      function deleteAnswer(){
        props.deleteAnswer(props.questionID,props.answer.answerID);
      }

    return (
        
        <Card className={cx(cardStyles.root, shadowStyles.root)}>
            <BrandCardHeader
                image={props.answer.photoUrl}
            />
            <CardContent className="questions">
            <p>{"By : "+props.answer.author}</p>
            <center>
            <div>
                {
                    props.answer.answer.split('\n').map(function(item) {
                return (
                    <h5>
                    {item}
                    </h5>
                )
                })}
            </div>
            </center> 
            {props.auth.isAuthenticated?
            <div className="row">
                <div className="col-4">
                {
                    props.answer.userEmail === props.auth.user.email?
                    <DeleteForeverIcon onClick={deleteAnswer}/>:null
                }
                </div>
                <div className="align-2 col-8">
                    <div className="row">
                        <div className="col-9 col-md-11">
                            <ArrowUpwardIcon color={vote===1?"secondary":""} onClick={()=>handleUpvotes(props.answer,props.auth)}/>
                        </div>
                        <div className="col-3 col-md-1 align">
                            <h5>{props.answer.upvoteCounter}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9 col-md-11">
                            <ArrowDownwardIcon color={vote===-1?"secondary":""} onClick={()=>handleDownvotes(props.answer,props.auth)}/>
                        </div>
                        <div className="col-3 col-md-1 align">
                            <h5>{props.answer.downvoteCounter}</h5>
                        </div>
                    </div>
                </div>
            </div>
            :null} 
            </CardContent>
    </Card>
  );
}


function AddAnswerComp(props){

    const [answer, setAnswer] = useState("");
    
    function submitAnswer(event){
      event.preventDefault();
        props.postAnswer(answer,props.questionID);
        setAnswer("");

    }

      function handleChange(event) {
        const value = event.target.value;
        setAnswer(value);
      }

      const [isClicked, SetClicked] = useState(false);

      function handleAnswerclick() {
        SetClicked(true);
      }

    return (
        <div className="row m-0">
          <div className="col-12 col-md-8 offset-md-2" onClick={handleAnswerclick}>
            <form  className="create-task">
                <textarea
                name="answer"
                onChange={handleChange}
                value={answer}
                placeholder="Add your answer"
                rows={isClicked ? 6 : 1}
            />
                <div className="align-2">
                  <Zoom in={true}>
                    <Fab type="submit" onClick={submitAnswer}>
                      <AddIcon />
                    </Fab>
                  </Zoom>
                </div>
            </form>
          </div>
        </div>
  );
}


class Answers extends React.Component{
    componentDidMount(){
        this.props.fetchAnswers(this.props.questionID)
    }
    render(){
        return(
        <div>
            {this.props.answers.isLoading || this.props.answers.answers ===null?
            <Load/>:
            <div className="cphead">
              {this.props.auth.isAuthenticated?
                <AddAnswerComp postAnswer={this.props.postAnswer} questionID = {this.props.questionID}/>:null}
                {
                    this.props.answers.answers.map(answer=>{
                    return <AllAnswers 
                        answer={answer} 
                        auth ={this.props.auth} 
                        key={answer.answerID} 
                        deleteAnswer={this.props.deleteAnswer}
                        updateAnswer={this.props.updateAnswer} 
                        questionID = {this.props.questionID}/>})
                }
            </div>
            }
        </div>
        )
}}
export default connect(mapStateToProps,mapDispatchToProps)(Answers);
