import { useState } from "react";
import { useNavigate } from "react-router-dom";

const otpnum = () => {
  let Navigate=useNavigate()
  let [otp,setOtp]=useState()
  let otpverifyHandler=async()=>{
    try {
      const res=await fetch('http://localhost:5000/auth/verify',{
        method:'PATCH',
        headers:{
          "content-type":'application/json'
        },
        body:JSON.stringify({otp})
      })
      const data= await res.json()
      console.log(data)
      if(data.msg)
        localStorage.setItem('verify',data.msg)
      Navigate('/home')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="container">
      <div className="mb-3 mt-5">
    <label htmlFor="exampleInputotp1" className="form-label">otp NUmber</label>
    <input type="text" className="form-control" id="exampleInputotp1" 
    onChange={(e)=>setOtp(e.target.value)}/>
  </div>
  <button className="btn btn-primary" onClick={otpverifyHandler} >Verify</button>

    </div>
    </div>
  );
}

export default otpnum;
