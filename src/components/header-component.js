import React, { useState } from 'react';
import {Link , NavLink} from 'react-router-dom';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { green } from '@material-ui/core/colors';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
function Header(props){
    const[isOpen,setOpen]=useState(false);
    const[alert,setalert]=useState(false);

    function handleGoogleLogin(event) {
        console.log(event);
        props.googleLogin();
        event.preventDefault();
    }

    function handleLogout() {
        props.logoutUser();
    }

    function alertSet(){
        if(!props.auth.isAuthenticated){
        setalert(true);
        setTimeout(() => {
            setalert(false)
            }, 3000);
        }
  }

    return(
        <div>
            <nav className="navbar navbar-dark navbar-expand mt-3">
                <div className="container-fluid">
                    <DehazeIcon 
                        style={{ color: green[500]}} 
                        fontSize="large"  
                        onClick={()=>setOpen(!isOpen)}>
                    </DehazeIcon>
                    <Link 
                        className="navbar-brand align mr-auto" to="/">
                             StudGo
                    </Link>
                    
                    {alert&&!props.auth.isAuthenticated?<Alert className="alert" severity="info" action={
                    <Button  onClick={()=>setalert(false)}>
                        <CancelIcon/>
                    </Button>
                    }>Please Login First!</Alert>:null}
                    <div className="mr-1">
                    {!props.auth.isAuthenticated?
                        <Button variant="outlined"
                            style={{color : green[500]}} 
                            onClick={(event)=>handleGoogleLogin(event)}>
                            <span>Log In With <span className="fa fa-google fa-lg"></span></span>
                            {props.auth.isFetching ?
                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                : null
                            }
                        </Button>
                        :
                        <div className="row head">
                        <div className="col-12">
                        <img src={props.auth.user.photoURL} alt="Proile Pic" className = "profilePic"/>
                            <div className="navbar-text mr-1">{props.auth.user.displayName.substring(0,50)}</div>
                            
                        </div>
                        <div className="col-12">
                            <Button variant="outlined" 
                                style={{color : green[500]}} 
                                onClick={()=>handleLogout()}>
                                Log Out
                                    {props.auth.isFetching ?
                                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                        : null
                                    }
                            </Button>
                            </div>
                        </div>
                    }
                    </div>
                </div>
            </nav>
            <div className={isOpen?"row m-0 sidebar sidebar-open":"row m-0 sidebar"}>
                <div className="col-7 col-md-3 style1">
                <aside>
                    <div className="align-class">
                        <CancelIcon fontSize="large" style={{color : green[500]}} onClick={()=>setOpen(!isOpen)}> Close </CancelIcon>
                     </div>
                    
                        <ul className="clist" onClick={async(event)=>{setOpen(false)}}>
                            <li > <NavLink style={{textDecoration : 'none' , color : green[500]}} to='/home'>Home</NavLink></li>
                            <li onClick={()=>alertSet()}><NavLink style={{textDecoration : 'none' , color : green[500]}} to='/share'>Experience 3000</NavLink></li>
                            <li onClick={()=>alertSet()}><NavLink style={{textDecoration : 'none' , color : green[500]}} to='/task'>Task Master</NavLink></li>
                            <li onClick={()=>alertSet()}><NavLink style={{textDecoration : 'none' , color : green[500]}} to='/open'>Open Source Champ</NavLink></li>
                            <li > <NavLink style={{textDecoration : 'none' , color : green[500]}} to='/news'>News Wall</NavLink></li>
                            <li onClick={()=>alertSet()}><NavLink style={{textDecoration : 'none' , color : green[500]}} to='/cp'>CP Master</NavLink></li>
                        </ul>
                    
                    
                </aside>
                </div>
                <div className="col-5 col-md-9 style" onClick={()=>setOpen(!isOpen)}>
                </div>
            </div>
        </div>

    );

}
export default Header;