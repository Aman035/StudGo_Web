import React from 'react';
import Load from './loading-component';
import {connect} from 'react-redux';
import BlogPage from './blogPage';
//import { updateBlog } from '../redux/ActionCreators';
const mapStateToProps = state => {
    return {
      blogs : state.blogs,
      auth : state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
  // updateBlog: (blog) => dispatch(updateBlog(blog))
  });


class FullBlog extends React.Component{
    render(){
        return (
            <div>
            {this.props.blogs.isLoading || this.props.blogs.errmess || this.props.blogs.blogs === undefined || !this.props.blogs.blogs.length?
            <Load/>:
            <BlogPage 
            blog={this.props.blogs.blogs.filter((blog) => blog.blogID === this.props.match.params.id)[0]} 
            auth={this.props.auth}
            updateBlog = {this.props.updateBlog}
            />}
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FullBlog);