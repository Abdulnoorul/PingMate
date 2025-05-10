import React from 'react'
import '../CSS/Login.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import { auth, db } from '../Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {doc, setDoc} from "firebase/firestore"



function Login() {

  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const navigate = useNavigate()

  const userLogin = ()=>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      const user = userCredential.user;
      alert("Logged in successfully") 
      navigate("/chat")
      // ...
    })
    .catch((error) => {
      alert("User doesn't exists or Wrong Credentials")
      setEmail('')
      setPassword('')
    });
  }

  return (
    <>
      <div className="mlog">
        
        <div className="flog">
        
          <div className='imghead'>
          <img src="./licon.png" alt="" id='limg' />
          <h1 id='lhead'>Login</h1>
          </div>

          <div className='lform'>
          
          <div className='linp'>
            <label htmlFor="" className='lbl' >UserName: </label>
            <input 
              type="email" 
              className='inp' 
              value={email}
              onChange={(event)=>{setEmail(event.target.value)}}
              />
          </div>

          <div className='linp'>
            <label htmlFor="" className='lbl' >Password: </label>
            <input 
              type="password" 
              className='inp' 
              value={password}
              onChange={(event)=>{setPassword(event.target.value)}}
              />
          </div>

            <button onClick={userLogin} id='mlgbtn'>Login</button>
            
            <Link to="/signup" id='hype'>New User Signup </Link>
            

          </div>

        </div>
        <Link to="/" id="hypeHo">Home</Link>

      </div>
    </>
  )
}

export default Login
