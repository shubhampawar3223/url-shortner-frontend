import React from 'react';
import Navbar from './Navbar'
import {Link} from 'react-router-dom';
import './Home.css'
//Home() is a homepage of the website
export default function Home(){
    return(
       <div style={{
           backgroundImage:'url(https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png)',
           backgroundSize:"cover",
           height:"100vh"}}> 
        <Navbar/>
        <div className="d-flex" style={{marginTop:"7%"}} >
             
            <div style={{display:"inline", position:"relative",marginLeft:"35%"}}>
           <Link to='/login'><button className="btn btn-info">
            <i class="fa fa-user-plus fa-5x"  aria-hidden="true"></i> 
            <label style={{fontWeight:"bolder",color:"black", display:"box",fontSize:"25px", position:"absolute",left:"14px",bottom:"-40px"}}>Login</label> 
            </button></Link>
            </div>

            <div style={{display:"inline", position:"relative",marginLeft:"20%"}}>
            <Link to='/signup'><button className="btn btn-info">
            <i class="fa fa-sign-in fa-5x" aria-hidden="true" ></i>    
            <label style={{fontWeight:"bolder",color:"black", display:"box",fontSize:"25px", position:"absolute",left:"3px",bottom:"-40px"}}>Signup</label>
            </button></Link>
            </div>
            
        </div>
        <div className="container-fluid text-center font1" style={{marginTop:"5%"}} >
          <h1 style={{fontWeight:"bolder"}}>Keep your URL's short with URL-Shortner.</h1> 
        </div>
        </div>
    )
}