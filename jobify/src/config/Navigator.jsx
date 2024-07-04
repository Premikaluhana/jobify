import {Routes,Route} from 'react-router-dom'
import {Signup,Otpnum,Home,Login} from '../pages'
const Navigator = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/otp' element={<Otpnum/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default Navigator;
