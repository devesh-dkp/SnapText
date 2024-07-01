import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Extract from './components/Extract'
import Footer from './components/Footer'


function App() {
  return (
    <>
      <Router >
        <Routes>
          <Route path="/" element={<><Header/> <Home/> <Footer/></>} />
          <Route path="/about" element={<><Header/> <About/> <Footer/></>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/extract" element={<><Header/> <Extract/> <Footer/></>} />
        </Routes>
      </Router>
    </>
  )
}

export default App