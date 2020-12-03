import React from 'react';
import Load from '../loading-component';
import EachPlan from './eachPlan';
import AssignmentIcon from '@material-ui/icons/Assignment';
function Allplans(props){
    return (
        <div>
            {props.plans.isLoading||props.plans.plans === undefined?
            <Load/>:
            <div>
            {props.plans.plans.length==0?
                <div className="align-3">
                <AssignmentIcon className="no-task"/>
                <h3 className="pending">No Schedules</h3>
                </div>:
                <div className="row cphead">
                        {
                            props.plans.plans.map(plan=>{
                                return (<EachPlan key={plan.id} plan={plan}/>)
                            })
                        }
                </div>
            }
            </div>
            }
        </div>
    )
}
export default Allplans;