import React from 'react';
import {connect} from 'react-redux'
import {deletePlan} from '../../redux/ActionCreators';
import Load from '../loading-component';
import PlanPage from './planpage';
const mapStateToProps = state => {
    return {
      plans: state.plans,
    }
}
const mapDispatchToProps = (dispatch) => ({
   deletePlan: (id) => dispatch(deletePlan(id))
  });

class FullPlan extends React.Component{

    render(){
        return (
            <div>
                {this.props.plans.isLoading || this.props.plans.errmess || this.props.plans.plans === undefined || !this.props.plans.plans.length?
                <Load/>:
                <PlanPage 
                plan={this.props.plans.plans.filter((plan) => plan.id === this.props.match.params.id)[0]} 
                deletePlan = {this.props.deletePlan}
                />}
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FullPlan);