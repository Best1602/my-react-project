import React, { useState, useEffect } from 'react';
import { FiCode, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './Header.css';
import Login from '../page/Login';
import Register from '../page/Register';

function Header({ cartItems, isLoggedIn, handleLogout }) {
  const [click, setClick] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  });
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const openRegisterPopup = () => {
    setShowLoginPopup(false);
    setShowRegisterPopup(true);
    closeMobileMenu();
  };

  const openLoginPopup = () => {
    setShowRegisterPopup(false);
    setShowLoginPopup(true);
    closeMobileMenu();
  };

  const closePopup = () => {
    setShowRegisterPopup(false);
    setShowLoginPopup(false);
  };

  const handleRegisterInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    console.log(registerFormData);
    setRegisterFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log(loginFormData);
    setLoginFormData({
      email: '',
      password: ''
    });
    // Simulate login success
    handleLogout();
  };

  const handleScroll = () => {
    const isTop = window.scrollY < 100;
    if (isTop !== isScrolled) {
      setIsScrolled(isTop);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div className={`header ${isScrolled ? 'fixed' : ''}`}>
        <div className="container">
          <div className="header-con">
            <div className="logo-container">
              <Link to="/">Best</Link>
            </div>
            <ul className={click ? 'menu active' : 'menu'}>
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to="/product">PRODUCT</Link>
              </li>
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to="/Adminproduct">Adminproduct</Link>
              </li>
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to="/sale">Addproduct</Link>
              </li>
              <li className="menu-link" onClick={closeMobileMenu}>
                <Link to={{ pathname: "/Summary", state: { cartItems: cartItems } }}>shopping cart</Link>
              </li>
              <li className="menu-link" onClick={isLoggedIn ? handleLogout : openRegisterPopup}>
                {isLoggedIn ? (
                  <Link to="/">Logout</Link>
                ) : (
                  <Link>Sign Up</Link>
                )}
              </li>
              {!isLoggedIn && (
                <li className="menu-link" onClick={openLoginPopup}>
                  <Link>Sign in</Link>
                </li>
              )}
            </ul>
            <div className="mobile-menu" onClick={handleClick}>
              {click ? <FiX /> : <FiMenu />}
            </div>
          </div>
        </div>
      </div>
      {showRegisterPopup && (
        <div className={`popup ${isScrolled ? 'fixed' : ''}`}>
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <Register
              formData={registerFormData}
              handleInputChange={handleRegisterInputChange}
              handleSubmit={handleRegisterSubmit}
            />
          </div>
        </div>
      )}
      {showLoginPopup && (
        <div className={`popup ${isScrolled ? 'fixed' : ''}`}>
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <Login
              formData={loginFormData}
              handleInputChange={handleLoginInputChange}
              handleSubmit={handleLoginSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
