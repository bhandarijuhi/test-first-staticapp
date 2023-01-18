import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/About";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />}/>
        </Routes>
      </BrowserRouter>
      <h1>Welcome to Static App</h1>
    </div>
  );
}

export default App;