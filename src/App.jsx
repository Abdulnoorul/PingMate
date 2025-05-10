import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../src/Pages/Home'
import Login from '../src/Pages/Login'
import Signup from '../src/Pages/Signup'
import Chat from '../src/Pages/Chat'
import Protected from './Protected'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/signup' element={<Signup />} ></Route>
          <Route path="/chat" element={<Protected Component={Chat}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
