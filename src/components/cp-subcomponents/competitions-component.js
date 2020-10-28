import React from 'react';
import Card from './card-component';
function Competitions(props){
    return (
        <div className="container">
            <div className="row cpguide">
                <div className="col-12">
                    <Card img="/assets/images/cp/7.png" comp={props.comp[0]} addTask = {props.addTask}/>
                </div>
            </div>
            <div className="row cpguide">
                <div className="col-12">
                    <Card img="/assets/images/cp/8.jpg" comp={props.comp[1]} addTask = {props.addTask}/>
                </div>
            </div>
            <div className="row cpguide">
                <div className="col-12">
                    <Card img="/assets/images/cp/9.jpg" comp={props.comp[2]} addTask = {props.addTask}/>
                </div>
            </div>
            <div className="row cpguide">
                <div className="col-12">
                    <Card img="/assets/images/cp/10.jpg" comp={props.comp[3]} addTask = {props.addTask}/>
                </div>
            </div>
        </div>
    )
}
export default Competitions;