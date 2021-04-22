import React,{useState,useRef} from 'react';
import Navbar from './Navbar';
import { Alert } from 'reactstrap';
import {Link} from 'react-router-dom';

//Activation() component is used to set user activation.
export default function Activation(){

    const [activeFlag,setFlag] = useState(0);
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [loading, setLoading] = useState(false);

    const emailRef = useRef();
    
    const onDismiss = () => setVisible(true);
    const onDismiss1 =()=> setVisible1(true)
    const activate = async(e)=>{
        e.preventDefault();
        setLoading(true);
        let c=emailRef.current.value;
        if(c=== '')
        onDismiss();
        else{
           let postdata={
               email: c
           }
           
           const url="https://url-shortnerrr.herokuapp.com/activation";
           const resp = await fetch(url,{
               method: 'POST',
               mode: 'cors',
               cache: 'no-cache',
               credentials: 'same-origin',
               headers:{
                   'Content-Type': 'application/json'
               },
               referrerPolicy: 'no-referrer',
               body: JSON.stringify(postdata)
           })
           if(resp.status === 200){
            setLoading(false);   
            setFlag(1);
           }
           else{
            setLoading(false);   
            onDismiss1();
           }
        }
    }
     return(
       <div style={{
        backgroundImage:'url(https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png)',
        backgroundSize:"cover",
        height:"100vh"}}>
           <Navbar/>
           { visible ?
           <Alert color="info" isOpen={visible} toggle={onDismiss}>
           Enter All Fields!!
         </Alert>            
          :null
           }

          { visible1 ?
           <Alert color="info" isOpen={visible1} toggle={onDismiss1}>
           Incorrect credentials...Please Try Again!! 
         </Alert>
          :null
           }

          <div className="offset-4  col-4 form-group" >
          <div style={{marginTop:"50%"}} >
          {activeFlag===0 ?
          <>    
          <input type="text" ref={emailRef}  className="form-control mb-2" placeholder="Enter Registered Email Id" />
          <button className="btn btn-primary form-control" style={{fontSize:"20px"}} onClick={activate}>Click here to Activate Your Account</button>
          </>
          :
          <>
          <p style={{marginLeft:"30%", color:"black", fontSize:"20px"}}>Your account is active now!!</p>
          <Link to='/login'><button className="btn btn-primary form-control" style={{fontSize:"30px"}}>Login</button></Link>
          </>            
        } 
          </div>
          
      </div>
      {
              loading?
              <div className="d-flex mt-3 justify-content-center">
                  <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span class="sr-only">Loading...</span>
              </div>
              :null
          }
       </div>
               
     )
}