import React , {useState} from 'react';
import { Fab,Zoom } from "@material-ui/core";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { green } from '@material-ui/core/colors';
import { Alert } from '@material-ui/lab';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
function NewPlan(props){
    const [plan,setPlan] = useState({title : "",dayCount : 0});
    const[alert,setalert]=useState(false);
    function handleChange(event) {
        const { name, value } = event.target;
        setPlan(prevplan => {
        return {
            ...prevplan,
            [name]: value
        };
    });
    }
    function handleUp(){
        setPlan(prevplan => {
            return {
                ...prevplan,
                dayCount : plan.dayCount+1
            };
        });
    };

    function handledown() {
        if(plan.dayCount<=0)
        return ;
        setPlan(prevplan => {
        return {
            ...prevplan,
            dayCount : plan.dayCount-1
        };
    })}

    async function handlePlan(){
        await props.post(plan);
        setPlan({
            title : "",
            dayCount : 0
        });
        alertSet();
    }
    function alertSet(){
        setalert(true);
        setTimeout(() => {
            setalert(false)
            }, 5000);
        }

    return(
        <div>
        {alert?<Alert className="alert" severity="success" action={
                    <Button  onClick={()=>setalert(false)}>
                        <CancelIcon/>
                    </Button>
                    }>Plan Setup Successful ! You can edit your plan in 'My Plans' Section.</Alert>:null}
            <div className="row m-0">
                <div className="col-10 col-md-6 offset-1 offset-md-3">
                    <form className="create-task">
                        <input
                        name="title"
                        onChange={handleChange}
                        value={plan.title}
                        placeholder="Title"
                        />
                    </form>
                </div>
            </div>
            <div className="row m-0 mt-5">
                <div className="col-12 align-c">
                    <h3>Enter No. of Days for which plan is to be made</h3>
                </div>
                <div className="col-12 align-c">
                    <Zoom in={true}>
                        <Fab>
                            {plan.dayCount}
                        </Fab>
                    </Zoom>
                </div>
                <div className="col-12 align-c mt-5">
                    <ArrowUpwardIcon onClick={handleUp} color={"secondary"} className="padbtn"/>
                    <ArrowDownwardIcon onClick={handledown} color={"secondary"} className="padbtn"/>
                </div>
            </div>
            <div className="row m-0 mt-5">
                <div className="col-12 align-c">
                    {plan.dayCount>0&&plan.title!==""?
                    <Button style={{color:green[500],fontSize : '90%'}} onClick={handlePlan}>
                        SetUp Plan
                    </Button>
                    :null
                    }
                </div>
            </div>
        </div>
    )
}
export default NewPlan;