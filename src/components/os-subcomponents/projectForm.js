import React, { useState } from 'react';
import AddIcon from "@material-ui/icons/Add";
import { Fab,Zoom } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';

function ProjectForm(props){

    const [alert,setalert] = useState(false);
    const [project, setProject] = useState({title: "",content: "",tags:"",link: ""});

    function alertSet(){
        setalert(true);
        setTimeout(() => {
            setalert(false)
            }, 3000);}

    function handleChange(event) {
        const { name, value } = event.target;
        setProject(prevProject => {
        return {
            ...prevProject,
            [name]: value
        };
        });
    }

    function submitProject(event) {
        if(project.link.length>0){
        props.postProject(project);
        alertSet(true);
          setProject({
              title: "",
              content: "",
              tags : "",
              link : ""
          });
          event.preventDefault();
        }
      }

    return(
            <div>

                {alert?<Alert className="alert" severity="success" action={
                    <Button  onClick={()=>setalert(false)}>
                        <CancelIcon/>
                    </Button>
                    }>Project Added Successfully!</Alert>:null}

                  <div className="row m-0">
                    <div className="col-10 col-md-6 offset-1 offset-md-3">
                      <form className="create-task">
                          <input
                            name="title"
                            onChange={handleChange}
                            value={project.title}
                            placeholder="Title"
                          />
                          <hr/>
                        <textarea
                          name="content"
                          onChange={handleChange}
                          value={project.content}
                          placeholder="Tell Something about your Project"
                          rows= {10}
                        />
                        <hr/>
                        <input
                            name="tags"
                            onChange={handleChange}
                            value={project.tags}
                            placeholder="Add Tags seperated by commas eg React,C++"
                          />
                          <hr/>
                          <input
                            name="link"
                            onChange={handleChange}
                            value={project.link}
                            placeholder="Provide link to the repository of Project (This Field Can't be empty)"
                          />
                          <div className="align-2">
                          <Zoom in={true}>
                            <Fab>
                              <AddIcon onClick = {submitProject}/>
                            </Fab>
                          </Zoom>
                        </div>
                      </form>
                    </div>
                </div>
                </div>
    )
}

export default ProjectForm;