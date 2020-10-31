import React from 'react';

function Loading (){
    return (
        <div className="row loadingRow">
            <div className="col-4 offset-4">
                <span className="fa fa-4x fa-spinner fa-pulse fa-fw"></span>
            </div>
        </div>
    )
}
export default Loading;