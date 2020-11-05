import React from 'react';
import {postProject} from '../../redux/ActionCreators';
import {connect} from 'react-redux';
import ProjectForm from './projectForm';
const mapStateToProps = state =>({
    projects : state.projects
})
const mapDispatchToProps = (dispatch) => ({
        postProject : (project)=> dispatch(postProject(project))
  });

class AddProject extends React.Component{
    render(){
        return(
            <ProjectForm postProject={this.props.postProject}/>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddProject);