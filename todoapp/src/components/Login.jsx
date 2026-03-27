import React, { useState } from 'react'
import Signup from './Signup'
import './todo.css'
import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [log, SetLog] = useState(true)
  const [email, SetEmail] = useState("")
  const [password, SetPassword] = useState("")
  function isTrue() {
    if (log === true) {
      SetLog(false)
    } else {
      SetLog(true)
    }
  }
  const navigate = useNavigate(); //for naviagation after login
  const handleLogin = async () => {
    if (email === "" || password === "") {
      // toast.warning('Enter the credentials')
      toast.error('Enter the credentials')
      console.log('enter data')
    }
    else {

      const user = await fetch('http://localhost:5000/userlogin', {
        method: 'post',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (user.ok) {
        let result = await user.json()
        console.log(result.user)
        navigate('/mytodos')
        localStorage.setItem('token', result.token);
        // } 
      } else {
        toast.error('Wrong User name or password')
      }
    }
  }
  return (
    <div className='Logincontainer'>
      <ToastContainer position='top-center'/>
      <div><h2>TodoSphere</h2></div>
      <div className='LoginCard'>
        <div className='inSideCard'>

          <div>
            {log ?
              (<div className='inputLogin'><label>Email </label> <input onChange={(e) => SetEmail(e.target.value)} value={email} type="email" placeholder='Email' /><br></br>
               <label>Password</label> <input  onChange={(e) => SetPassword(e.target.value)} value={password} type="password" placeholder='password' />
                <button className='publicBtn my-3' onClick={() => handleLogin()}>Login</button>
              </div>) : (<Signup />)}

          </div>
          <div><p className='' style={{ cursor: 'pointer' }} onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </p></div>
        </div><hr style={{color:'#000', width:'100%'}}/>
        <div><p className='' onClick={isTrue}>{log ? (<>New User!<span style={{color:'#a609d2',cursor:'pointer'}}>SingUp</span></>) : (<>Already have an Account ! <span style={{color:'#a609d2',cursor:'pointer'}}>Login</span></>)}</p></div>
      </div>
    </div>
  )
}
