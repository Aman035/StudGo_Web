import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    margin : 'auto',
    marginTop : 20,
    width : '90%',
    maxWidth : 600,
    borderRadius: 60,
    backgroundColor: '#a3a29d',
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/gplay.png")'
  },
  content: {
    padding: 24,
  },
}));
function QuestionCard(props) {
  const shadowStyles = useLightTopShadowStyles();
  const cardStyles = useStyles();
  return (
    <Card className={cx(cardStyles.root, shadowStyles.root)}>
            <BrandCardHeader
                image={props.question.photoUrl}
            />
            <CardContent className="questions">
            <p>{"By : "+props.question.author}</p>
            <center>
            <div>
              {
                  props.question.question.split('\n').map(function(item) {
              return (
                  <span>
                  {item}
                  <br/>
                  </span>
              )
              })}
            </div>
            <h6>
                <Link to={`/question/${props.question.questionID}`}>See Answers
                </Link>  
            </h6>
            </center>  
            </CardContent>
    </Card>
  );
};
export default QuestionCard;