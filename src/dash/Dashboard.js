import React,{useState,useEffect,useRef} from 'react';
import Navbar from '../Navbar';
import './dash.css';
import {Link,Route} from 'react-router-dom';
//import UseAuth from '../UseAuth';
import Login from '../Login';
import './dash.css';

//Dashboard() is a user dashboard.Using which we can create short url.
//also we can watch user created url's.
export default function Dashboard(){
   const [processing, setProcessing] = useState(0); 
   const [processing1, setProcessing1] = useState(0);
   const [urlArr, setUrlarr] = useState([]);
   const [parentUrl,setParentUrl] = useState()
   const [childUrl,setChildUrl] = useState();
   const [warningOne,setWarningone] = useState();
   const [tCount,settCount] = useState(0);
    const [dCount,setdCount] = useState(0);
    const [mCount,setmCount] = useState(0);
    const [loading, setLoading] = useState(0);
   const urlRef = useRef();
   
    
    useEffect(async()=>{
    setLoading(1);
    await  userUrls();
    update();  
    },[])
    
    const userUrls = async()=>{
        setProcessing1(1);
       let auth= localStorage.getItem('Authorisation'); 
       let email= localStorage.getItem('Email');
       let url1 = 'https://url-shortnerrr.herokuapp.com/get-user-url/?email='+ email;
          let resp1 = await fetch(url1,{
           method:'GET',
           mode:'cors',
           headers:{
               'Content-Type': 'application/json',
               'Authorisation': auth
           }
       })
        let data1 = await resp1.json();
        if(data1){
            setProcessing1(0);
            setUrlarr(()=> data1);
            setLoading(0);
        }
    }
    
    //update() is used to get total counts of url's.
    const update= async()=>{
        let auth = localStorage.getItem('Authorisation')
        let url="https://url-shortnerrr.herokuapp.com/getCounts";
        let resp = await fetch(url,{
         method:'GET',
         mode:'cors',
         headers:{
             'Content-Type': 'application/json',
             'Authorisation': auth
         }
        }) 
        let data = await resp.json()
        if(data){
          settCount(data.tCount);
           setmCount(data.mCount);
           setdCount(data.dCount);
           setLoading(0);  
        }
       }
    
    //createUrl() will create a short url
    const createUrl = (e)=>{
     e.preventDefault();
     if(urlRef.current.value !== ''){
      setProcessing(1);
      if(warningOne === 1){
          setWarningone(0);
      }
     let a =Math.floor(Math.random() * (199999) +1);
     let temp = window.location.href;
     temp= temp.split('/');
     temp.pop();
     temp = temp.join('/');
     temp=temp+'/';
     let url = temp+ a;
     setParentUrl(urlRef.current.value);
     setChildUrl(url);
     setProcessing(0);
     }
     else{
         setWarningone(1);
         return <p>Please enter valid url.</p>
     }
    }

    //saveUrl() is used to save the short url.
    const saveUrl = async (e) =>{
          e.preventDefault();
          setLoading(1);
        if(urlRef.current.value !== ''){
         let auth= localStorage.getItem('Authorisation'); 
         let email= localStorage.getItem('Email');
         let url = 'https://url-shortnerrr.herokuapp.com/create-url';
        let postData={
            parent_url: parentUrl,
            child_url: childUrl,
            creator: email
        };
        let res = await fetch(url,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorisation': auth
            },
            referrerPolicy:'no-referrer',
            body: JSON.stringify(postData)
        }) 
        if(res.status === 200){
            userUrls();
            update();

            
        }
     }
    }    

   return(
       <div style={{
        backgroundImage:'url(https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png)',
        backgroundSize:"cover",
        height:"100vh"}}>
          <Navbar/>
          <div className="d-flex justify-content-center mt-5">
          <Link to='/urls'><button className="btn btn-info btn-lg">See All Urls</button></Link>
              
          </div>
          <div className="col-12 d-flex justify-content-around headers ">
               <div className="col-3  text-center p-3 head-style bg-dark text-white" style={{fontWeight:"bolder", fontSize:"20px"}} >Statistics</div>
               <div className="col-3  text-center p-3 head-style bg-dark text-white" style={{fontWeight:"bolder", fontSize:"20px"}} >Create-Link</div>
               <div className="col-3  text-center p-3 head-style bg-dark text-white" style={{fontWeight:"bolder", fontSize:"20px"}} >Your Links</div>
          </div>             
         
          <div className="col-12 d-flex justify-content-around  name" >
              
          <div className=" col-3 box-style  border border-dark " >
          { 
           loading === 0 ?
           <div>
           <div className="card mt-5 border border-light" style={{backgroundColor:"#5da89c"}}>
              <div className="card-body text-center ">
                  <h4 className="card-title ">Daily Links Count</h4>
                  <h2 >{dCount}</h2>
              </div>
           </div>   

           <div className="card mt-5 border border-light " style={{backgroundColor:"#5da89c"}}>
              <div className="card-body text-center ">
                  <h4 className="card-title ">Monthly Links Count</h4>
                  <h2 >{mCount}</h2>
              </div>
           </div>   

           <div className="card mt-5 border border-light " style={{backgroundColor:"#5da89c"}} >
              <div className="card-body text-center ">
                  <h4 className="card-title ">Total Links Count</h4>
                  <h2 >{tCount}</h2>
              </div>
           </div> 

         </div>
        :
        <div className=" mt-5">
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            <span class="sr-only">Loading...</span>
        </div> 
        } 
        </div>    

        <div className=" col-3 box-style  border border-dark ">
                  <div className="card mt-5" style={{backgroundColor:"#5da89c"}}>
                         <div className="card-body">
                            <input type='url' ref={urlRef} className="form-control" placeholder='Enter Original URL'></input> 
                            <button className="btn btn-info mt-2"  onClick={createUrl}>Create</button> 
                            {warningOne?
                             <p style={{color:'red'}}>Please Enter Valid Url!!</p>
                            :null}
                            {processing ?
                             <p>Loading...</p> 
                             :
                             <div className="mt-2">
                             <p>New Url:</p> 
                             <Link to={{ pathname: parentUrl }} style={{fontFamily:"PT Sans Narrow", fontFamily:"PT Sans Narrow"}} target="_blank" >{childUrl}</Link>
                             </div>
                            }          
                            <button className="btn  btn-info mt-2" onClick={saveUrl}>Save</button>       
                         </div>
                  </div>
                  {
                  loading?
                  <div>
                      <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                      <span class="sr-only">Loading...</span>                
                  </div>
                  :null
                   }
              </div>

              <div className=" col-3 box-style border border-dark ">
                  {
                  loading === 0 ?
                  <div style={{height:"500px", overflow:"auto"}} className=" mt-5" >
                      {
                       processing1 ?   
                        <p>Loading</p>
                        :
                        urlArr.map((e)=>{
                        return(
                            <div className="card" key={e.child_url} style={{backgroundColor:"#5da89c"}}>
                               <div className="card-body">
                               <label>Parent Url:</label><br></br>    
                               <Link to={{ pathname: e.parent_url }} style={{color:"black", textDecoration:"underline", fontFamily:"PT Sans Narrow"}} target="_blank" >{e.parent_url}</Link>    
                               <br></br><label>New Url:</label><br></br>
                               <Link to={{ pathname: e.parent_url }} style={{color:"black", textDecoration:"underline", fontFamily:"PT Sans Narrow",}} target="_blank" >{e.child_url}</Link>
                                
                               </div>                                           
                            </div>
                        ) 
                        })
                        
                      }
                      
                  </div>
                  :
                  <div className=" mt-5">
                  <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                   <span class="sr-only">Loading...</span>
                  </div>
                }
              </div>
              
          </div> 
       </div> 
    )
}