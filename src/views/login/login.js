import React, { useState } from 'react'
import './login.css'
import Foot_Img from '../../assets/Vectors.png'
import { useNavigate } from 'react-router-dom';
import { API_CALLS } from '../../services/Api/apiCalls';
import { toast } from 'react-toastify';

export default function Login() {
  const [EmailID,setEmailId]=useState("");
  const [EmailIDErr,setEmailIdErr]=useState("");
  const [password,setPassword]=useState("");
  const [passwordErr,setPasswordErr]=useState("");
  const [err,setErr]=useState("");

  const navigate=useNavigate();
  const onSubmitLogin=(e)=>{
    e.preventDefault();
    if(EmailID=="" || password==""){
      setErr("Please enter email and paasword")
    }
    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(EmailID);

    if (!isEmailValid) {
      setEmailIdErr('Please enter valid email.');
      return
    }
    let obj={
      "email_id":EmailID,
      "password":password
  }
  if(obj){
      API_CALLS.adminLogin(obj).then(res=>{
        if(res && res.status==200){
          const {user_id,email_id,name}=res?.data;
          const {token}=res;
          const storeData={
            user_id,email_id,name,token
          }
          localStorage.setItem("setUser",JSON.stringify(storeData))
          toast.success(res?.message, { autoClose: 2000, position: toast.POSITION.TOP_RIGHT });
          setTimeout(() => {
            navigate("/dashboard");
          }, 2500);
        }
      })
  }
  }
  return (
    <>
    <div className='container-background-login'>
      <div className='container'>
        <div className='row' style={{justifyContent:"center"}}>
          <div className='col-lg-3 col-12' >
            <div className='sign-in' >Sign In</div>
            <form>
              <div className='form-group'>
                
                <input type='email' onChange={(e)=>{
                  setErr("")
                  setEmailIdErr("");
                  setEmailId(e.target.value);
                }} value={EmailID} className='form-control shadow-none' placeholder='Email' />
              </div>
              <div className='form-group'>
                
                <input type='password' onChange={(e)=>{
                  setErr("")
                  setPassword(e.target.value);
                }} value={password} className='form-control shadow-none' placeholder='Password' />
              </div>
             
           
            <div className='form-group form-check d-flex justify-content-center'>
                <input type='checkbox' className='form-check-input ' id='rememberMe' />
                <label className='form-check-label' htmlFor='rememberMe'>Remember me</label>
              </div>
              <div className='text-center'>
                <button type='submit' onClick={onSubmitLogin}  className='btn btn-login'><strong>Login</strong></button>
                <div>
                  <span style={{color:"red",fontSize:12}}>{err?err:EmailIDErr?EmailIDErr:""}</span>
                </div>
              </div>
              </form>
             
          </div>
        </div>
        
      </div>
    
    </div>
    <div className='container-fluid' style={{backgroundColor:'#093545'}}>
      <div className='row'>
        <div className='col-12 px-0'>
          <img src={Foot_Img} width={'100%'}/>
        </div>
      </div>
    </div>
    </>
  )
}
