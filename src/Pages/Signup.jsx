import React, {useState} from 'react'
import '../CSS/Signup.css'
import {Link, useNavigate} from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../Firebase'
import {doc, setDoc} from "firebase/firestore"

function Signup() {

  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const navigate = useNavigate()
  const[displayName, setDisplayName] = useState('')

  const addToFirestore = async (u)=>{
          const userRef = doc(db, 'users', u.uid)
          await setDoc(userRef,{
            uid:u.uid,
            name: displayName || 'Guest',
            email:u.email
          }, {merge:true})
 }

  const createUser = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            addToFirestore(user)
            alert("Registered successfully, you can login now")
            navigate("/login") 

            // ...
        })
        .catch((error) => {
            alert("User already exists or bad credentials")
            setEmail('')
            setPassword('')
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }   

  return (
    <>
      <div className="main">
        
        <div className="submain">
          <div className="shead">
            <h1 id='sighead'>Signup Form</h1>
          </div>
          <div className="sigfrm">
            <div className='sdfrm'>
              <label htmlFor="" className="labl" >Full Name: </label>
              <input 
                type="text" 
                className='sname' 
                value={displayName}
                onChange={(event)=>setDisplayName(event.target.value)}
                />
            </div>
            <div className='sdfrm'>
              <label htmlFor="" className="labl" >Email: </label>
              <input 
                type="email" 
                className='sname' 
                value={email}
                onChange={(event)=>{setEmail(event.target.value)}}
                />
            </div>
            <div className='sdfrm'>
              <label htmlFor="" className="labl" >Password: </label>
              <input 
                type="password" 
                className='sname' 
                value={password}
                onChange={(event)=>{setPassword(event.target.value)}}
                />
            </div>
          </div>
          <button onClick={createUser} id="sigbtn">Sign Up</button>
          <Link to="/login" id="hypel">Already Registered</Link>
          <Link to="/" id="hypeHo">Home</Link>
        </div>

        
        
      </div>
    </>
  )
}

export default Signup
