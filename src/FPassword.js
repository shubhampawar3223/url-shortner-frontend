import React,{useState, useRef} from 'react';
import Navbar from './Navbar';
import { Alert } from "reactstrap";


//FPassword() component is used to send forget password request from user to server.
//it collects email as a input and send it to server.
export default function FPassword(){
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [loading, setLoading] = useState(false);

    const onDismiss = () => setVisible(false);
    const onDismiss1 = () => setVisible1(false);
    const onDismiss2 = () => setVisible2(false);
    const inpRef = useRef();
    
    const sendmail= async(e)=>{
        setLoading(true);
          e.preventDefault();
          if(inpRef.current.value === ''){
              setVisible(true);
          }
          else{
            let postData={
                email: inpRef.current.value
            };
            let url="https://url-shortnerrr.herokuapp.com/fpass";
            let resp = await fetch(url,{
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              headers:{
                  'Content-Type': 'application/json'
              },
              referrerPolicy: 'no-referrer',
              body: JSON.stringify(postData)
            }) 
            if(resp.status === 200){
               setVisible2(true);
            }
            else if(resp.status === 400){
                setVisible1(true)
            }
          }
          setLoading(false);
    }

    return(
        <div style={{
            backgroundImage:'url(https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png)',
            backgroundSize:"cover",
            height:"100vh"}}>
          <Navbar/>
          <Alert color="danger" isOpen={visible} toggle={onDismiss} fade={false}>
          <p className="text-center">No input!!.</p>
          </Alert>
        
          <Alert color="danger" isOpen={visible1} toggle={onDismiss1} fade={false}>
          <p className="text-center">User Doesn't Exit.</p>
          </Alert>

          <Alert color="secondary" isOpen={visible2} toggle={onDismiss2} fade={false}>
          <p className="text-center">Password reset link has been sent to your email Id.</p>
          </Alert>
    
          <div className="offset-4 col-4">
          <div className=" mt-5 text-center justify-content-center p-2 border">
            <h4>Please enter registered email address.</h4>
            <input type="email" ref={inpRef} placeholder="Enter Email Id" className="form-control"/>  
            <button onClick={sendmail} className="btn btn-primary mt-2 form-control">Submit</button>
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