import React from 'react';
import { green} from '@material-ui/core/colors';
function NewsItem(props){
    return (
        <div className="col-10  offset-1 col-md-8 offet-md-2 news-item">
            <h3>{props.news.title}</h3>
            <div className="align-2">
               <h5><a style={{textDecoration : 'none' , color : green[700]}} href={props.news.url}>Know More</a></h5>
            </div>
        </div>
    )
}
export default NewsItem;