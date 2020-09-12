import React from 'react';
import NewsItem from './news-item';
function News(props){
    console.log(props);
    return (
        <div>
            {props.isLoading?
            <div className="row loadingRow">
                <div className="col-4 offset-4">
                    <span className="fa fa-4x fa-spinner fa-pulse fa-fw"></span>
                </div>
            </div>
            :props.news.length>0?
            <div className="row m-0">
            {props.news.map(eachnews=>{
               return <NewsItem news={eachnews} key={eachnews.id}/>
            })}
            </div>
            :null
            }
        </div>
    )
}
export default News;