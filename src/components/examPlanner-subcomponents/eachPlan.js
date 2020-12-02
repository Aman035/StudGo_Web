import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    margin : 'auto',
    marginTop : 50,
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
function PlanCard(props) {
  const shadowStyles = useLightTopShadowStyles();
  const cardStyles = useStyles();
  return (
    <Card className={cx(cardStyles.root, shadowStyles.root)}>
            <CardContent className="questions">
            <center>
                <Link to={`/plan/${props.plan.id}`}>{props.plan.title}
                </Link>  
            </center>  
            </CardContent>
    </Card>
    
  );
};
export default PlanCard;