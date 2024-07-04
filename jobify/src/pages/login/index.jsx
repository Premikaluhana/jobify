import { useNavigate } from "react-router-dom";
import { useState } from "react";
const index = () => {
  let Navigate=useNavigate()
  let [email,SetEmail]=useState('')
  let [password,SetPassword]=useState('')
  let loginHandler=async()=>{
    try {
      const res=await fetch('http://localhost:5000/auth/login',{
        method:'POST',
        headers:{                       
          "content-type":'application/json'
        },//ha msg sai h pass glt
        body:JSON.stringify({email,password})
      })
      const data= await res.json()
      console.log(data)
      if(data.msg==="Logged In")
        localStorage.setItem('token',data.token)
      Navigate('/home')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container">
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
   onChange={(e)=>SetEmail(e.target.value)}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"
   onChange={(e)=>SetPassword(e.target.value)}/>
  </div>
  <button className="btn btn-primary"onClick={loginHandler}>Submit</button>
  </div>
  );
}

export default index;
