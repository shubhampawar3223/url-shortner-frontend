import React,{useState,useContext} from "react";
//import "./style.css";
import {BrowserRouter as Router,Redirect,Route,Switch} from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js'
import Activation from './Activation';
import Dashboard from './dash/Dashboard';
import Urls from './Urls';
import Home from './Home';
import FPassword from './FPassword';
import ResetPass from './ResetPass'
import Navbar from './Navbar';

export const WrapperContext = React.createContext({
      user: null,
      isLoggedIn:false,
      logout:()=>{}
})

const WrapperRoute = ({render,...restProps})=>{
  const { isLoggedIn,user}=useContext(WrapperContext);
  return(
      <Route
      {...restProps}
      render = {
          (props)=>{
              if(isLoggedIn){
                return <Redirect to={`/dashboard`} />
              }else{
                  return render(props)
              }
          }
      }
      />
  )
}

const ProtectRoute = ({component: Component, ...restProps})=>{
  const { isLoggedIn, logout, user}=useContext(WrapperContext);

  
  return(
      <Route
      {...restProps}
      render = {
          (props)=>{
              if(localStorage.getItem('Authorisation') === null){
                 return <Redirect to="/login"/>
              }else{
                  return (
                      <> 
                          <Component {...props} user={user}/>
                      </>
                  )
              }
          }
      }
      />
  )

}


export default function App() {
    const [user,setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = ()=>{
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem('Authorisation');
    }

    const handleLogin = (user,token)=>{
      setUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('Authorisation', token);
    }
  return (
    <Router>
      <WrapperContext.Provider
       value={
         user,
         isLoggedIn,
         logout
       }
      >
    <Switch>
      {/* <Route exact path="/nav" component={Navbar}/> */}
      <Route exact path="/" component={Home}/>
      <Route exact path="/signup" component={Register}/>
      <Route exact path="/activation/" component={Activation}/>
      <Route exact path="/fpassword" component={FPassword}/>
      <Route exact path="/reset-pass/:id" component={ResetPass}/>
      <WrapperRoute
        path="/login"
        render={(props)=><Login {...props} handleLogin={handleLogin} />}
      />

      <ProtectRoute  path="/dashboard"  component={Dashboard}/>
      <ProtectRoute  path="/urls"  component={Urls}/>
      
    </Switch>
    </WrapperContext.Provider>
    </Router>
  );
}
