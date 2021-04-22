import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar'


//Urls() component is used to get all urls created by website and list them.
export default function Urls(){
    const [arr, setArr] = useState([]);
    const [loading, setLoading] = useState(0);

    useEffect(()=>{
      getData();      
    },[])
  

    const getData = async()=>{
        setLoading(1)
        let auth= localStorage.getItem('Authorisation'); 
        let url1 = 'https://url-shortnerrr.herokuapp.com/all-url';
           let resp1 = await fetch(url1,{
            method:'GET',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorisation': auth
            }
        })
         let data1 = await resp1.json();
         setArr(()=> data1.data);
         setLoading(0)
    }

    return(
        <div style={{
          backgroundImage:'url(https://coolbackgrounds.io/images/backgrounds/index/ranger-4df6c1b6.png)',
          backgroundSize:"cover",
          height:"100vh"}}>
        <Navbar/>
        <div className="d-flex justify-content-center mt-5 container" style={{overflow: 'auto',}}>
        <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Sr. No.</th>
      <th scope="col">Short Url</th>
      <th scope="col">parent Url</th>
      <th scope="col">User</th>
    </tr>
  </thead>
  <tbody>
    {
    loading ?
     <div className="mt-3 ">
         <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
             <span class="sr-only">Loading...</span>
     </div>
    :
    <>
       {
        arr.map((e,i)=>{
        return( 
        <tr key={i}>
        <th scope="row">{i+1}</th>
        <td><Link style={{color:"black",fontFamily:"PT Sans Narrow", textDecoration:"underline"}} to={{ pathname: e.parent_url }} target="_blank" >{e.child_url}</Link></td>
        <td><Link style={{color:"black",fontFamily:"PT Sans Narrow",  textDecoration:"underline"}} to={{ pathname: e.parent_url }} target="_blank" >{e.parent_url}</Link></td>
        <td>{e.creator}</td>
        </tr>
        )
        })
       }  
    </>
    } 
    </tbody>
     </table>         

        </div>
        </div>
    )
}