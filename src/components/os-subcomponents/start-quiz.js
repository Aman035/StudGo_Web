import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
function StartQuiz (props){

    const [start,setStart] = useState(false);
    const [score,SetScore] = useState(0);
    const [index,SetIndex] = useState(0);
    const [show,SetShow] = useState(false);
    const [showScore,SetShowScore] = useState(false);
    
    let qno = props.quiz[index];

    function HandleClick(num){

        if(!show){
            if(qno.options[num].correct)
                SetScore(score+1);
            
            SetShow(true);
        }
    }

    function EndQuiz(){
        SetIndex(0);
        setStart(false);
        SetShowScore(true);
    }

    function HandleState(){
        if(index!==9)
        SetIndex(index+1);
        else
            EndQuiz();
        SetShow(false);
    }

    function Correct(){

        if(qno.options[0].correct)
        return (
            <span>A</span>
        )

        if(qno.options[1].correct)
        return (
            <span>B</span>
        )

        if(qno.options[2].correct)
        return (
            <span>C</span>
        )

        if(qno.options[3].correct)
        return (
            <span>D</span>
        )
    }

    return (
        <div className="row cpguide">
            <div className="col-12">
                {!start?
                    <Button variant="outlined" color="secondary" onClick={()=>{setStart(true);SetScore(0);SetShowScore(false)}}>
                        Start Quiz
                    </Button>:
                    <div>
                        <h4 className="quiz-ques">{qno.question}</h4>
                        <ul>
                            {qno.options.map((option,ind)=>{
                                return <li className="quizli" key={ind}>{option.value}</li>
                            })}
                        </ul>
                        <div className="row">
                            <div className="col-4 cp">
                                {show?
                                <p>Correct Ans : <Correct/></p>:null
                                }
                            </div>
                            <div className="col-4">
                                <Button variant="outlined" color="primary" onClick={()=>HandleClick(0)}>A</Button>
                                <Button variant="outlined" color="primary" onClick={()=>HandleClick(1)}>B</Button>
                                <Button variant="outlined" color="primary" onClick={()=>HandleClick(2)}>C</Button>
                                <Button variant="outlined" color="primary" onClick={()=>HandleClick(3)}>D</Button>
                            </div>
                            <div className="col-4">
                                {show?
                                <Button variant="outlined" color="secondary" onClick={()=>HandleState()}>Next</Button>:null
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="col-12">
                    {showScore?
                    <h5 className="cp cphead">Final Score : {score} / 10</h5>:null}
            </div>
        </div>
    )
}
export default StartQuiz;