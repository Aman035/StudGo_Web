import React from 'react';
import ComCard from './comm-card';
import {data} from './data';
function Communities(){
    return (
        <div>
        <div className="row m-0">

                {data.map(comm=>{
                    return (<ComCard comm ={comm}/>)
                })
                }
        </div>
        </div>
    )
}
export default Communities;