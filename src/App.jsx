import React from 'react'
import { Routes, Route } from "react-router-dom";
import Hero from './Pages/Hero';
import AfterAnalysis from './Pages/AfterAnalysis';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/AfterAnalysis" element={<AfterAnalysis />} />
    </Routes>
  )
}

export default App
