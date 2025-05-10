import React from 'react'
import '../CSS/Home.css'
import { useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate()

  return (
    <>
          <div className="contain">
              
              <div className='headi'>
                    <h1 id='headtop'>Welcome to Ping Mate</h1>
                  <p id='tagtop'>Where every chat is safe</p>
              </div>

              <div className='tbtns'>
                  <button id='lbtn' onClick={()=>{navigate("/login")}} >Login</button>
                  <button id='sbtn' onClick={()=>{navigate("/signup")}} >Sign Up</button>
              </div>
              
          </div>
    </>
  )
}

export default Home
