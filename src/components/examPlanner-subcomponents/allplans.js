import React from 'react';
import Load from '../loading-component';
import EachPlan from './eachPlan';
function Allplans(props){
    return (
        <div>
            {props.plans.isLoading||props.plans.plans === undefined?
            <Load/>:
            <div className="row cphead">
                    {
                        props.plans.plans.map(plan=>{
                            return (<EachPlan key={plan.id} plan={plan}/>)
                        })
                    }
            </div>
            }
        </div>
    )
}
export default Allplans;