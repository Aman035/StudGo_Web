import React from 'react';
import EachDay from './eachDay';
function DayPlan(props){
    return(
        <div className="row cphead">
                        {
                            props.plan.map(eachDay=>{
                                return (<EachDay key={eachDay.day} day={eachDay} id={props.id}/>)
                            })
                        }
                </div>
    )
}
export default DayPlan;