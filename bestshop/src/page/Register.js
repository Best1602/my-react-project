import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function Register() {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  

  const adduser = () => {
    const userData = {
      username: username,
      email: email,
      password: password,
     
    };

    axios
      .post('http://localhost:4000/register/add', userData)
      .then((response) => {
        console.log(response);
        const responsemess = response.data.message;
        if (responsemess === 'Please provide all the required data') {
          Swal.fire('Error', 'Please provide all the required data', 'error');
        } else {
          Swal.fire('Success', 'User successfully added', 'success');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (

      <div className="container">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <label htmlFor="email">
          <b>USERNAME</b>
        </label>
        <input
          type="text"
          onChange={(event) => setusername(event.target.value)}
          placeholder="USERNAME"
          name="username"
          required
        />

      
        <label htmlFor="psw-repeat">
          <b> Password</b>
        </label>
        <input
          type="password"
          onChange={(event) => setpassword(event.target.value)}
          placeholder=" Password"
          name="psw-repeat"
          required
        />
     <label htmlFor="psw">
          <b>Email  </b>
        </label>
        <input
          type="text"
          onChange={(event) => setemail(event.target.value)}
          placeholder="Enter email"
          name="psw"
          required
        />

            

        <p>
          By creating an account you agree to our <a href="#" style={{ color: 'dodgerblue' }}>Terms & Privacy</a>.
        </p>

        <div className="clearfix">
        <button onClick={adduser} className="signupbtn">
            Sign Up
          </button>
          <button type="button" className="cancelbtn">
            Cancel
          </button>
         
        </div>
      </div>

  );
}

export default Register;
