import React from 'react';
import NewsItem from './news-item';
import { connect } from 'react-redux';
const mapStateToProps = state => {
    return {
      news : state.news
    }
}

function News(props){
    return (
        <div>
            {props.isLoading||props.news === null?
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

class NewsComp extends React.Component{
    render(){
        return(
            <News
                news = {this.props.news.news}
                isLoading = {this.props.news.isLoading}
                errmess = {this.props.news.errmess}
            />
        )
    }
}

export default connect(mapStateToProps)(NewsComp);
//export default NewsComp;