import React from 'react';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {postPlan} from '../../redux/ActionCreators';
import EachPlan from './eachPlan';
import NewPlan from './newPlan';
import Load from '../loading-component';
import AllPlans from './allplans';
const mapStateToProps = state => {
    return {
      plans : state.plans
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
                <AllPlans plans ={this.props.plans}/>
                :
                <NewPlan post ={this.props.postPlan}/>
            }
            </div>
        </div>
    )
}
}
export default connect(mapStateToProps,mapDispatchToProps)(Epnav);