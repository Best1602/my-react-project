import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Login.css'

function Login() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const login = () => {
    const userData = {
      username: username,
      password: password,
    };
    axios
      .post('http://localhost:4000/login', userData)
      .then((response) => {
        console.log(response);
        const responseData = response.data;
        if (responseData.error) {
          
          Swal.fire('Error', responseData.message, 'error');
        } else {
          Swal.fire('Success', 'login', 'success').then(() => {
            sessionStorage.setItem('Token', JSON.stringify(responseData.token));
            window.close();
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    window.close();
  };

  return (
    <div className="container">
      <h1>Sign in</h1>
      <p>Please fill in this form to create an account.</p>
      <hr />

      <label htmlFor="email">
        <b>USERNAME</b>
      </label>
      <input
        type="text"
        placeholder="USERNAME"
        name="username"
        required
        onChange={(event) => setusername(event.target.value)}
      />

      <label htmlFor="psw-repeat">
        <b> Password</b>
      </label>
      <input
        type="password"
        placeholder=" Password"
        name="psw-repeat"
        required
        onChange={(event) => setpassword(event.target.value)}
      />

  
      <div className="clearfix">
      <button className="signupbtn" onClick={login}>
          Sign in
        </button>
        <button type="button" onClick={handleCancel} className="cancelbtn">
          Cancel
        </button>
        
      </div>
    </div>
  );
}

export default Login;
