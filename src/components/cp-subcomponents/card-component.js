import React ,{useState} from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import EachComp from './eachcomp';
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 500,
    margin: 'auto',
    boxShadow: 'none',
    borderRadius: 0,
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
}));

export const CompetitionCard = React.memo(function CompCard(props) {
  const styles = useStyles();
  const shadowStyles = useBouncyShadowStyles();
  
  const[show,setShow] = useState(false);

  return (
    <div className="row">
      <div className="col-12">
        <Card className={cx(styles.root, shadowStyles.root)}>
        <img src = {props.img} alt="cpimg" className="cpp"/>
          
          <CardContent className={styles.content}>
            <Button color={'primary'} fullWidth className={styles.cta} onClick={()=>setShow(!show)}>
            {show?<p>Show Less</p>:
            <p>Show More</p>}
            </Button>
          </CardContent>
        </Card>
      </div>
      {show?
      <div className="col-12">
          {props.comp.objects.map(eachComp=>{
              return <EachComp comp = {eachComp} key= {eachComp.id} addTask  ={props.addTask}/>
          })}
      </div>:null
      }
    </div>
  );
});

export default CompetitionCard;