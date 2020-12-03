import React from 'react';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Guide from './guide-component';
import Communities from './communities';
import Questions from './questions';

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
                <div className="col-6">
                    <Button 
                        style={this.state.page ===2?{outline : 'none' ,color : green[500],fontSize : '80%'}:{outline : 'none',color : 'white',fontSize : '80%'}}
                        onClick={async()=> await this.setState({page :2})}>
                        Communities
                    </Button>
                </div>
                <div className="col-3">
                    <Button 
                        style={this.state.page === 3?{outline : 'none' ,color : green[500],fontSize : '80%'}:{outline : 'none',color : 'white',fontSize : '80%'}}
                        onClick={async()=> await this.setState({page :3})}>
                        QnA
                    </Button>
                </div>
            </div>
            {this.state.page === 1?
                <Guide/>:
                <div>
                    {this.state.page === 2?
                    <Communities/>:
                    <Questions/>
                    }
                </div>
            }
        </div>
    )
}
}
export default OSnav;