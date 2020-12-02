import React from 'react';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {postPlan} from '../../redux/ActionCreators';
import EachPlan from './eachPlan';
import NewPlan from './newPlan';
const mapStateToProps = state => {
    return {
      plans : state.plans,
      auth : state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
  postPlan : (plan)=> dispatch(postPlan(plan))
});

class Epnav extends React.Component
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
                        Make a Plan
                    </Button>
                </div>
                <div className="col-6 col-md-4">
                    <Button 
                        style={!this.state.WriteOn?{outline : 'none' ,color : green[500],fontSize : '80%'}:{outline : 'none',color : 'white',fontSize : '80%'}}
                        onClick={async()=> await this.setState({WriteOn :false})}>
                        My Plans
                    </Button>
                </div>
            </div>
            {!this.state.WriteOn?
                <div className="row cphead">
                        {
                            this.props.plans.plans.map(plan=>{
                                return (<EachPlan key={plan.id} plan={plan}/>)
                            })
                        }
                </div>
                :
                <NewPlan post ={this.props.postPlan}/>
            }
        </div>
    )
}
}
export default connect(mapStateToProps,mapDispatchToProps)(Epnav);