import React from 'react';
import {connect} from 'react-redux'
import {deleteProject} from '../../redux/ActionCreators'
import Load from '../loading-component';
import ProjectPage from './projectPage';
const mapStateToProps = state => {
    return {
      projects : state.projects,
      auth : state.auth
    }
}
const mapDispatchToProps = (dispatch) => ({
   deleteProject: (id) => dispatch(deleteProject(id))
  });

class FullProject extends React.Component{
    render(){
        return (
            <div>
                {this.props.projects.isLoading || this.props.projects.errmess || this.props.projects.projects === undefined || !this.props.projects.projects.length?
                <Load/>:
                <ProjectPage 
                project={this.props.projects.projects.filter((project) => project.projectID === this.props.match.params.id)[0]} 
                auth={this.props.auth}
                deleteProject = {this.props.deleteProject}
                />}
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FullProject);