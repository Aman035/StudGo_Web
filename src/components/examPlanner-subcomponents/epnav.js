import React from 'react';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import NewPlan from './newPlan';
import AllPlans from './allplans';
import {connect} from 'react-redux';
import {postPlan} from '../../redux/ActionCreators';

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
                        All Plans
                    </Button>
                </div>
            </div>
            {this.state.WriteOn?
                <NewPlan post = {this.props.postPlan}/>:
                <AllPlans plans ={this.props.plans} auth ={this.props.auth}/>
            }
        </div>
    )
}
}
export default connect(mapStateToProps,mapDispatchToProps)(Epnav);