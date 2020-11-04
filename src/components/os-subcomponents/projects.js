import React from 'react';
import {postProject} from '../../redux/ActionCreators';
import {connect} from 'react-redux';
import EachProject from './eachProject';
import {Link} from 'react-router-dom';
import { Fab,Zoom } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
const mapStateToProps = state => {
    return {
      projects: state.projects
    }
}

const mapDispatchToProps = (dispatch) => ({
    postProject  : (project)=> dispatch(postProject(project))
  });

class Projects extends React.Component{
    render(){
        return(
            <div>
                <div className="row m-0">
                    <div className="col-12 col-md-6">
                        {
                            this.props.projects.projects.map(project=>{
                                return (<EachProject key={project.projectID} project={project}/>)
                            })
                        }
                    </div>
                </div>
                <Zoom in={true}>
                    <Fab>
                        <Link to="/addproject"><AddIcon/></Link>
                    </Fab>
                </Zoom>
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Projects);