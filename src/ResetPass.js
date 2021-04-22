import React,{useState, useRef} from 'react';
import Navbar from './Navbar';
import { Alert } from "reactstrap";

//this componenet is used to change the password
export default function ReasetPass(){
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [visible11, setVisible11] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible22, setVisible22] = useState(false);
    const [loading, setLoading] = useState(false);

    const onDismiss = () => setVisible(false);
    const onDismiss1 = () => setVisible1(false);
    const onDismiss11 = () => setVisible11(false);
    const onDismiss2 = () => setVisible2(false);
    const onDismiss22 = () => setVisible22(false);
    const inpRef1 = useRef();
    const inpRef2 = useRef(); 
     const sendmail= async(e)=>{

        
        setLoading(true);
          e.preventDefault();
          let pass1= inpRef1.current.value;
          let pass2 =inpRef2.current.value;
          if(pass2 === '' || pass2 === ''){
              setVisible(true);
          }
          else{
           if(pass1 !== pass2){
            setVisible11(true);
           } 
           else{ 
            let href= window.location.href;
            let arr = href.split("/");
            let token = +arr[arr.length-1];    
            let postData={
                token:token,
                password: pass1,
            };
            let url="https://url-shortnerrr.herokuapp.com/set-pass";
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
            else if(resp.status === 404){
                setVisible1(true)
            }
            else if(resp.status === 429)
            setVisible22(true)
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
          <p className="text-center">Please provide input!!.</p>
          </Alert>
        
          <Alert color="danger" isOpen={visible1} toggle={onDismiss1} fade={false}>
          <p className="text-center">Request not found.</p>
          </Alert>

          <Alert color="danger" isOpen={visible11} toggle={onDismiss11} fade={false}>
          <p className="text-center">Password Mismatch.</p>
          </Alert>

          <Alert color="secondary" isOpen={visible2} toggle={onDismiss2} fade={false}>
          <p className="text-center">Password got changed successfully.</p>
          </Alert>

          <Alert color="danger" isOpen={visible22} toggle={onDismiss22} fade={false}>
          <p className="text-center">Password link is expired now.</p>
          </Alert>
    
          <div className="offset-4 col-4">
          <div className=" mt-5 text-center justify-content-center p-2 border">
            <h4>Please enter new password.</h4>
            <input type="password" ref={inpRef1} placeholder="Enter Password" className="form-control"/>
            <input type="password" ref={inpRef2} placeholder="Confirm Password" className="form-control"/>  
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