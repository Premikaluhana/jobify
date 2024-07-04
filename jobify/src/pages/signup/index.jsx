import { useState } from "react";
import { useNavigate } from "react-router-dom";
const signup = () => {
  let Navigate=useNavigate()
  let [Name,SetName]=useState('')
  let [Lastname,SetLastName]=useState('')
  let [Location,SetLocation]=useState('')
  let [email,SetEmail]=useState('')
  let [password,SetPassword]=useState('')
  let SingUpHandler=async()=>{
    try {
      const res=await fetch('http://localhost:5000/auth/register',{
        method:'post',
        headers:{                       
          "content-type":'application/json'
        },
        body:JSON.stringify({Name,Lastname,email,Location,password})
      })
      const data= await res.json()
      console.log(data)
      if(data.msg==="successfully signup"){
        localStorage.setItem('token',data.token)
      Navigate('/otp')}
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container ">
      <div className="mb-3 mt-5">
    <label htmlFor="exampleInputName1" className="form-label">Name</label>
    <input type="text" className="form-control" id="exampleInputName1"
     onChange={(e)=>SetName(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputLastName1" className="form-label">Last Name</label>
    <input type="text" className="form-control" id="exampleInputLastName1"
    onChange={(e)=>SetLastName(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputLocation1" className="form-label">Location </label>
    <input type="text" className="form-control" id="exampleInputLocation1"
    onChange={(e)=>SetLocation(e.target.value)}/>
  </div>
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
  <button className="btn btn-primary" onClick={SingUpHandler}>Submit</button>

    </div>
  );
}

export default signup;