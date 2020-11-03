import React from 'react';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import WriteBlog from './writeBlog';
import AllBlogs from './allBlogs';
import {connect} from 'react-redux';
import {postBlog} from '../../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      blogs : state.blogs,
      auth : state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
  postBlog : (blog)=> dispatch(postBlog(blog))
});

class Blognav extends React.Component
{
    state={
        WriteOn : false
    }
    render(){
        
    return (
        <div>
            <div className="row cprow">
                <div className="col-6 col-md-4 offset-md-2">
                    <Button
                    style={this.state.WriteOn?{outline : 'none',color : green[500],fontSize : '80%'}:{outline : 'none',color : 'white',fontSize : '80%'}}
                        onClick={async ()=>await this.setState({WriteOn : true})}>
                        Write Blog
                    </Button>
                </div>
                <div className="col-6 col-md-4">
                    <Button 
                        style={!this.state.WriteOn?{outline : 'none' ,color : green[500],fontSize : '80%'}:{outline : 'none',color : 'white',fontSize : '80%'}}
                        onClick={async()=> await this.setState({WriteOn :false})}>
                        All Blogs
                    </Button>
                </div>
            </div>
            {this.state.WriteOn?
                <WriteBlog post = {this.props.postBlog}/>:
                <AllBlogs blogs ={this.props.blogs} auth ={this.props.auth}/>
            }
        </div>
    )
}
}
export default connect(mapStateToProps,mapDispatchToProps)(Blognav);