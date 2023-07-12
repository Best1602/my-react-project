// import React, { useState } from 'react';
// import { FiCode, FiMenu, FiX } from 'react-icons/fi';
// import './Header.css';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import Reister from '../page/Reister';
// import Login from '../page/Login';


// function Header() {
//   const [click, setClick] = useState(false);
//   const [showRegisterPopup, setShowRegisterPopup] = useState(false);
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [registerFormData, setRegisterFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });
//   const [loginFormData, setLoginFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleClick = () => setClick(!click);
//   const closeMobileMenu = () => setClick(false);

//   const openRegisterPopup = () => {
//     setShowLoginPopup(false);
//     setShowRegisterPopup(true);
//     closeMobileMenu();
//   };

//   const openLoginPopup = () => {
//     setShowRegisterPopup(false);
//     setShowLoginPopup(true);

//     closeMobileMenu();
//   };

//   const closePopup = () => {
//     setShowRegisterPopup(false);
//     setShowLoginPopup(false);
//   };

//   const handleRegisterInputChange = (event) => {
//     const { name, value } = event.target;
//     setRegisterFormData({ ...registerFormData, [name]: value });
//   };

//   const handleLoginInputChange = (event) => {
//     const { name, value } = event.target;
//     setLoginFormData({ ...loginFormData, [name]: value });
//   };

//   const handleRegisterSubmit = (event) => {
//     event.preventDefault();
    
//     console.log(registerFormData);
   
//     setRegisterFormData({
//       name: '',
//       email: '',
//       password: ''
//     });
//   };

//   const handleLoginSubmit = (event) => {
//     event.preventDefault();
//     // Handle login form submission logic here
//     console.log(loginFormData);
//     // Reset the login form fields
//     setLoginFormData({
//       email: '',
//       password: ''
//     });
//   };

//   const adduser = () => {
//     const { name, email, password } = registerFormData;
//     axios
//       .post('http://localhost:4000/login/add', { username: name, email, password })
//       .then((response) => {
//         console.log(response);
//         const responsemess = response.data.message;
//         if (responsemess === 'Please provide all the required data') {
//           Swal.fire('Error', 'Please provide all the required data', 'error');
//         } else {
//           Swal.fire('Success', 'Product successfully added', 'success');
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div>
//         <div className="header">
//             <div className="container">
//                 <div className="header-con">
//                 <div className="logo-container">
//                     <Link to="/">Best</Link>
//                 </div>
//                 <ul className={click ? 'menu active' : 'menu'}>
//                     <li className="menu-link" onClick={closeMobileMenu}>
//                     <Link to="/Product">PRODUCT</Link>
//                     </li>
//                     <li className="menu-link" onClick={closeMobileMenu}>
//                     <Link to="/News">NEWS</Link>
//                     </li>
//                     <li className="menu-link" onClick={closeMobileMenu}>
//                     <Link to="/Sale">SALE</Link>
//                     </li>
//                     <li className="menu-link" onClick={openRegisterPopup}>
//                     <Link>Sign Up</Link>
//                     </li>
//                     <li className="menu-link" onClick={openLoginPopup}>
//                     <Link>Sign in</Link>
//                     </li>
//                 </ul>
//                 <div className="mobile-menu" onClick={handleClick}>
//                     {click ? <FiX /> : <FiMenu />}
//                 </div>
//             </div>
//         </div>
        
//         </div>
//         {showRegisterPopup && (
//             <div className="popup">
//             <div className="popup-content">
//                 <span className="close" onClick={closePopup}>
//                 &times;
//                 </span>
//                 <Reister
//                 formData={registerFormData}
//                 handleInputChange={handleRegisterInputChange}
//                 handleSubmit={handleRegisterSubmit}
//                 adduser={adduser}
//                 />
//             </div>
//             </div>
//         )}
//         {showLoginPopup && (
//             <div className="popup">
//             <div className="popup-content">
//                 <span className="close" onClick={closePopup}>
//                 &times;
//                 </span>
//                 <Login
//                 formData={loginFormData}
//                 handleInputChange={handleLoginInputChange}
//                 handleSubmit={handleLoginSubmit}
//                 />
//             </div>
//             </div>
//         )}
//     </div>
//   );
// }

// export default Header;
