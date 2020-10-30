import React from 'react';
import Guide from './guide-component';
import Competitions from './competitions-component';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
class Cpnav extends React.Component
{
    state={
        GuideOn : true
    }
 
    render(){
        
    return (
        <div>
            <div className="row cprow">
                <div className="col-6 col-md-4 offset-md-2">
                    <Button
                    style={this.state.GuideOn?{outline : 'none',color : green[500],fontSize : '80%'}:{outline : 'none',color : 'white',fontSize : '80%'}}
                        onClick={async ()=>await this.setState({GuideOn : true})}>
                        Guide
                    </Button>
                </div>
                <div className="col-6 col-md-4">
                    <Button 
                        style={!this.state.GuideOn?{outline : 'none' ,color : green[500],fontSize : '80%'}:{outline : 'none',color : 'white',fontSize : '80%'}}
                        onClick={async()=> await this.setState({GuideOn :false})}>
                        Competitions
                    </Button>
                </div>
            </div>
            {this.state.GuideOn?
                <Guide/>:
                <Competitions comp = {this.props.comp} addTask = {this.props.addTask}/>
            }
        </div>
    )
}
}
export default Cpnav;