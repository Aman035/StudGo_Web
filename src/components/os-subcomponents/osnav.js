import React from 'react';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Info from './info';
import Quiz from './quiz';
import Project from './projects';
class OSnav extends React.Component
{
    state={
        page : 1
    }
 
    render(){
        
    return (
        <div>
            <div className="row cprow">
                <div className="col-3">
                    <Button
                    style={this.state.page === 1?{outline : 'none',color : green[500],fontSize : '80%'}:{outline : 'none',color : 'white',fontSize : '80%'}}
                        onClick={async ()=>await this.setState({page : 1})}>
                        Guide
                    </Button>
                </div>
                <div className="col-7">
                    <Button 
                        style={this.state.page ===2?{outline : 'none' ,color : green[500],fontSize : '80%'}:{outline : 'none',color : 'white',fontSize : '80%'}}
                        onClick={async()=> await this.setState({page :2})}>
                        Quiz Time
                    </Button>
                </div>
                <div className="col-2">
                    <Button 
                        style={this.state.page === 3?{outline : 'none' ,color : green[500],fontSize : '80%'}:{outline : 'none',color : 'white',fontSize : '80%'}}
                        onClick={async()=> await this.setState({page :3})}>
                        Projects
                    </Button>
                </div>
            </div>
            {this.state.page === 1?
                <Info/>:
                <div>
                    {this.state.page === 2?
                    <Quiz/>:
                    <Project/>
                    }
                </div>
            }
        </div>
    )
}
}
export default OSnav;