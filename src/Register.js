import React, { useState, useRef } from "react";
import Navbar from "./Navbar.js";
import {Link} from 'react-router-dom';
import { Alert } from "reactstrap";
import './App.css';

//Register() is used to register a user.
export default function Register() {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [loading, setLoading]  =useState(false);

  const onDismiss = () => setVisible(false);
  const onDismiss1 = () => setVisible1(false);
  const onDismiss2 = () => setVisible2(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const setStates = async e => {
    e.preventDefault();
    setLoading(true);
    let nl = nameRef.current.value.length;
    let el = emailRef.current.value.length;
    let pl = passwordRef.current.value.length;
    
    if (nl === 0 || el === 0 || pl === 0) {
      setVisible(true);
    } else {
    //    setEmail(emailRef.current.value);
    //    setPassword(passwordRef.current.value);
        let postData = {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          status:'inactive'
        };
        const url = "https://url-shortnerrr.herokuapp.com/signup";
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
      if (response.status === 200) {
        setVisible1(true);
      }
      else{
        setVisible2(true);
      }
    }
    setLoading(false);
  };

  return (
    <div style={{
        backgroundImage:'url(https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png)',
        backgroundSize:"cover",
        height:"100vh"}}>
      <Navbar />
      <Alert color="danger" isOpen={visible} toggle={onDismiss} fade={false}>
        Please Enter All The Fields.
      </Alert>

      <Alert color="success" isOpen={visible1} toggle={onDismiss1}>
      <p className="alert ml-5">Registration Successfull.Please check your mail to activate your account.</p> 
      </Alert>

        
      <Alert color="danger" isOpen={visible2} toggle={onDismiss2}>
        User Already Present.Click Here for login <Link to='/login'>Login Here</Link>
      </Alert>

      <div className="container">
        <div className="offset-4 mt-5">
          <div className="form-group border p-2 col-6">
            <input
              ref={nameRef}
              type="text"
              className="form-control"
              placeholder="Enter Your Name"
            />

            <input
              ref={emailRef}
              type="text"
              className="form-control mt-2"
              placeholder="Enter Email"
            />

            <input
              ref={passwordRef}
              type="text"
              className="form-control mt-2"
              placeholder="Password"
            />

            <button
              className="btn btn-primary form-control mt-3"
              onClick={setStates}
            >
              SignUp
            </button>
            <div className="mt-2 text-center">
            <Link to='/login'>Login !!</Link>
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
