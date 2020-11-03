import React from 'react'
import Load from '../loading-component';
import EachBlog from './eachBlog';
function AllBlogs(props){
        return (
            <div>
                {props.isLoading||props.blogs === null || !props.blogs.length || !props.auth.isAuthenticated?
                    <Load/>:
                    <div>
                        {props.blogs.map(blog=>{
                            return <EachBlog key = {blog.blogID} blog = {blog}  user ={props.auth.user.email}/>
                        })}
                    </div>
                }
            </div>
        )
}

class Blogs extends React.Component{

    render(){


        return(
            <div>
                <AllBlogs blogs = {this.props.blogs.blogs}
                        isLoading = {this.props.blogs.isLoading}
                        errmess = {this.props.blogs.errmess}
                        auth = {this.props.auth}/>
            </div>
        )
    }
}

export default Blogs;