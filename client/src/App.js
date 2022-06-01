import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Feed from './pages/Feed.js'

function App() {
  return (
    <Routes>

      {/* Home Page Routes */}
      <Route exact path='/' element={<Home />} />
      <Route exact path='/home' element={<Home />} />
      <Route exact path='/sign-up' element={<Home />} />
      <Route exact path='/register' element={<Home />} />

      {/* Login Page Routes */}
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/sign-in' element={<Login />} />

      {/* Feed Routes */}
      <Route exact path='/feed' element={<Feed />} />
    </Routes>
  )
}

export default App