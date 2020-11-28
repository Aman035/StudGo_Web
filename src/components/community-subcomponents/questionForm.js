import React, { useState } from 'react';
import AddIcon from "@material-ui/icons/Add";
import { Fab,Zoom } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
function QuestionForm(props){

    const [alert,setalert] = useState(false);
    const [question, setQuestion] = useState({question: "",tags:""});

    function alertSet(){
        setalert(true);
        setTimeout(() => {
            setalert(false)
            }, 3000);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setQuestion(prevQuestion => {
        return {
            ...prevQuestion,
            [name]: value
        };
        });
    }

    function submitQuestion(event) {
        props.postQuestion(question);
        alertSet(true);
          setQuestion({
              question : "",
              tags : ""
          });
          event.preventDefault();
      }

    return(
            <div>

                {alert?<Alert className="alert" severity="success" action={
                    <Button  onClick={()=>setalert(false)}>
                        <CancelIcon/>
                    </Button>
                    }>Question Added Successfully!</Alert>:null}
                
                  <div className="row m-0">
                    <div className="col-10 col-md-6 offset-1 offset-md-3">
                    <form className="create-task">
                        <textarea
                          name="question"
                          onChange={handleChange}
                          value={question.question}
                          placeholder="Write your question here."
                          rows= {8}
                        />
                        <hr/>
                        <input
                            name="tags"
                            onChange={handleChange}
                            value={question.tags}
                            placeholder="Add Tags seperated by commas eg React,C++"
                          />
                          <div className="align-2">
                          <Zoom in={true}>
                            <Fab>
                              <AddIcon onClick = {submitQuestion}/>
                            </Fab>
                          </Zoom>
                        </div>
                      </form>
                    </div>
                </div>
                </div>
    )
}

export default QuestionForm;