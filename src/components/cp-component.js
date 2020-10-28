import React from 'react';
import Cpnav from './cp-subcomponents/cpnav-component';
function Cp(props){
        return(
                <div>
                        {props.isLoading||props.comp === null||props.comp.length < 4?
                                <div className="row loadingRow">
                                        <div className="col-4 offset-4">
                                        <span className="fa fa-4x fa-spinner fa-pulse fa-fw"></span>
                                        </div>
                                </div>:
                        <Cpnav comp={props.comp} addTask = {props.postTask}/>
                        }
                </div>
        )
}
export default Cp;