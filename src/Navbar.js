import React, { useState, useRef, useEffect }from "react";
import {Link,Redirect,BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './Home';
import {useHistory} from "react-router-dom";


export default function Navbar() {
    const [login,setLogin] = useState(0);
    const history = useHistory();
    const logout = (e)=>{
         e.preventDefault();
         localStorage.removeItem('Authorisation');
         localStorage.removeItem('Email'); 
         setLogin(0);   
         history.push('/');
    }
  
   useEffect(()=>{  
    if(localStorage.getItem('Authorisation') === null) {
        setLogin(0);
      }
      else{
        setLogin(1);
      }    
   },[])

    return (
        <>      
           { localStorage.getItem('Authorisation') ?
            <nav className="navbar navbar-light bg-dark ">
            <a href="/"><span className="navbar-brand mb-01 text-light text-center" style={{fontFamily:"Dela Gothic One ", fontSize:"26px"}}>URL-Shortner</span></a>
            <button className="btn btn-sm btn-info mr-4" onClick={logout}> <i class="fa fa-sign-out fa-2x" aria-hidden="true">Logout</i></button>
            </nav>
             :
             <nav className="navbar navbar-light bg-dark ">
             <a href="/"><span className="navbar-brand mb-01 text-light text-center" style={{fontFamily:"Dela Gothic One ", fontSize:"26px"}}>URL Shortner</span></a>
             </nav> 
             }  
        </>
 
  );
}
