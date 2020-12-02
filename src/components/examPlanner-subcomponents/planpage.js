import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {withRouter} from 'react-router-dom';
import DayPlan from './dayPlan';
const useStyles = makeStyles(() => ({
  root: {
    margin : 'auto',
    maxWidth: 1100,
    borderRadius: 20,
  },
  content: {
    padding: 14,
  },
}));
function PlanCard(props) {
    const styles = useN03TextInfoContentStyles();
    const shadowStyles = useLightTopShadowStyles();
    const cardStyles = useStyles();

    function deletePlan(){
        props.deletePlan(props.plan.scheduleID);
        props.history.push('/examplanner');
    }

    return (
        <div className="cphead align-c">
            <Card className={cx(cardStyles.root, shadowStyles.root)}>
                <CardContent className={cardStyles.content}>
                    
                    <TextInfoContent
                    classes={styles}
                    className ="blog"
                    heading={props.plan.title}
                    />
                    {/* <div>
                        <div className="row">
                            <div className="col-4">
                                <DeleteForeverIcon onClick={deletePlan}/>
                            </div>
                        </div>
                    </div> */}
                </CardContent>
            </Card>
            <DayPlan plan = {props.plan.plan} id={props.plan.id}/>
        </div>
  );
};

export default withRouter(PlanCard);
