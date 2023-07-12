import './App.css';
import React, { useState } from "react";
import { BrowserRouter,Route, Router, Routes,NavLink,Link } from 'react-router-dom';
import Header from './components/Header';
import Product from './page/Product';
import Sale from "./page/Sale";
import Home from "./Home";
import News from "./page/News";
import Register from './page/Register';
import Login from './page/Login';
import Adminproduct from './page/Adminproduct';

import Summary from './page/Summary';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Sale" element={<Sale />} />
          <Route path="/News" element={<News />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          
          <Route path="/Adminproduct" element={<Adminproduct />} />
          <Route path="/Summary" element={<Summary />} />
        </Routes>
        </BrowserRouter>
    </div>

  );
} 

export default App;

