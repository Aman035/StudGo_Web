import React ,{useState} from 'react';
import AddIcon from "@material-ui/icons/Add";
import { Fab,Zoom } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';

function WriteBlog(props){

    const [blog, setBlog] = useState({title: "",content: "",tags:""});

    const[alert,setalert]=useState(false);

    function handleChange(event) {
      const { name, value } = event.target;
      setBlog(prevBlog => {
      return {
          ...prevBlog,
          [name]: value
      };
      });
  }

  function alertSet(){
    setalert(true);
    setTimeout(() => {
        setalert(false)
        }, 3000);
}
    function submitBlog(event) {
      props.post(blog);
      alertSet(true);
        setBlog({
            title: "",
            content: "",
            tags : ""
        });
        event.preventDefault();
    }

        return (
              <div>
                {alert?<Alert className="alert" severity="success" action={
                    <Button  onClick={()=>setalert(false)}>
                        <CancelIcon/>
                    </Button>
                    }>Blog Added Successfully!</Alert>:null}
                  <div className="row m-0">
                    <div className="col-10 col-md-6 offset-1 offset-md-3">
                      <form className="create-task">
                          <input
                            name="title"
                            onChange={handleChange}
                            value={blog.title}
                            placeholder="Title"
                          />
                          <hr/>
                        <textarea
                          name="content"
                          onChange={handleChange}
                          value={blog.content}
                          placeholder="Write what's on ur mind"
                          rows= {10}
                        />
                        <hr/>
                        <input
                            name="tags"
                            onChange={handleChange}
                            value={blog.tags}
                            placeholder="Add Tags seperated by commas eg React,C++"
                          />
                          <div className="align-2">
                          <Zoom in={true}>
                            <Fab>
                              <AddIcon onClick = {(event)=>submitBlog(event)}/>
                            </Fab>
                          </Zoom>
                        </div>
                      </form>
                    </div>
                </div>
                </div>
                
        )
}
export default WriteBlog;