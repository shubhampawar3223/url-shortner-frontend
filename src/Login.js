import React, { useState, useRef } from "react";
import {Link} from 'react-router-dom';
import Navbar from "./Navbar.js";
import { Alert } from "reactstrap";
import Dashboard from './dash/Dashboard';

//Login() component is used to login user.
export default function Login({handleLogin, history}) {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDismiss = () => setVisible(false);
  const onDismiss2 = () => setVisible2(false);
  const onDismiss3 = () => setVisible3(false);
  const onDismiss4 = () => setVisible4(false);

  const setStates = async (e) => {
    e.preventDefault();
   setLoading(true);
    let el = emailRef.current.value.length;
    let pl = passwordRef.current.value.length;
    if ( el === 0 || pl === 0) {
      setVisible(true);
    } else {
    // setEmail(emailRef.current.value);
    // setPassword(passwordRef.current.value);
    let postData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };
    const url = "https://url-shortnerrr.herokuapp.com/login";

    const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(postData) 
  });
  let n = await response.json()
  if(response.status === 200){
    handleLogin(postData.email,n.token )
    //localStorage.setItem('Authorisation',n.token);
    localStorage.setItem('Email',postData.email);
     history.push('/dashboard');
  }
  else if(response.status === 401){
    setVisible4(true)
    setLoading(false);
  }
  else if(response.status === 404){
    setVisible2(true)
    setLoading(false);
  }
  else if(response.status === 400){
    setVisible3(true)
    setLoading(false);   
  }
     
}

  };

  if(visible1){
      return <Dashboard/>
  }

  return (
    <div style={{
        backgroundImage:'url(https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png)',
        backgroundSize:"cover",
        height:"100vh"}}>
      <Navbar />
      <Alert color="danger" isOpen={visible} toggle={onDismiss} fade={false}>
        Please Enter All The Fields.
      </Alert>

     
      <Alert color="danger" isOpen={visible2} toggle={onDismiss2}>
        User doesn't exist.  <Link to='/signup'>Register Here!!</Link>
      </Alert>

      <Alert color="danger" isOpen={visible3} toggle={onDismiss3}>
        Incorrect Password!!!.Try again.

      </Alert>
      <Alert color="danger" isOpen={visible4} toggle={onDismiss4}>
        Inactive Account!! Pleasse activate your account from activation link sent to your email.
      </Alert>

      <div className="container">
        <div className="offset-4 mt-5">
          <div className="form-group border border-dark p-2 col-6">
            <input
              ref={emailRef}
              type="text"
              className="form-control"
              placeholder="Enter Email"
            />

            <input
              ref={passwordRef}
              type="password"
              className="form-control mt-2"
              placeholder="Password"
            />

            <button
              className="btn btn-primary form-control mt-3"
              onClick={setStates}
            >
              Login
            </button>


            <div className="mt-2 text-center">
              <Link style={{color:"black"}} to='/signup'>Register Here!!</Link>
            </div>

            <div className="mt-2 text-center">
              <Link style={{color:"black"}} to="/fpassword">Forget Password</Link>
            </div>
            
          </div>
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
  );
}

  