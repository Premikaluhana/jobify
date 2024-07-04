import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Home = () => {
  let Navigate=useNavigate()
  let logout =()=>{
    localStorage.removeItem('token')
    CheckUser()
  }
  let CheckUser =()=>{
    if(localStorage.getItem('token')==null){
      Navigate('/login')
    }
  }
  useEffect(() => {
    CheckUser()
  }, []);
  return (
    <div className="container mt-5">
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
      <button className="btn btn-primary" onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;