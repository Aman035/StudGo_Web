import React from 'react'
import {connect} from 'react-redux';
import Load from '../loading-component';
import EachBlog from './eachBlog';
const mapStateToProps = state => {
    return {
      blogs : state.blogs
    }
}
function AllBlogs(props){
        return (
            <div>
                {props.isLoading||props.blogs === null || !props.blogs.length ?
                    <Load/>:
                    <div>
                        {props.blogs.map(blog=>{
                            return <EachBlog blog = {blog} key = {blog.blogID}/>
                        })}
                    </div>
                }
            </div>
        )
}

class AllBlog extends React.Component{
    render(){
        return <AllBlogs blogs = {this.props.blogs.blogs}
        isLoading = {this.props.blogs.isLoading}
        errmess = {this.props.blogs.errmess}/>
    }
}
export default connect(mapStateToProps)(AllBlog);