import React from 'react'
import { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import './login.css'

const Register = () => {
    const history=useHistory();
    const[user,setuser]=useState(null);
    const [errormessage, seterror] = useState(null);
    const [loading,setloading]=useState(false);
    const handleChange = (e) => {
        const value = e.target.value;
        setuser({ ...user, [e.target.name]: value });
      };
      const handleSubmit = async () => {
        try {
          setloading(true);
          const res = await axios.post("https://mern-todo-auntentication.herokuapp.com/api/auth/register",user);

          console.log(res.status);
          setloading(false);
          seterror(null)  
          localStorage.setItem("user",JSON.stringify(res.data));
          history.push('/');
    

        } catch (err) {
            console.error("Error response:");
            seterror(err.response.data)
            console.error(err.response.data);    // ***
        }
        setloading(false);
    
      }
  return (
    <div className="loginform" id="loginform">
      <h3>Register</h3>
        {errormessage && (
        <p className="error"> {errormessage} </p>
      )}
      <label>Name</label>
        <input
            type="text"
            id="username"
            name="username"
            className="row"
            onChange={handleChange}
          />
          <label>Email</label>
            <input
            type="text"
            id="email"
            name="email"
            className="row"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            id="password"
            name="password"
            className="row"
            onChange={handleChange}
          />
          <button className="row" id="btn" onClick={handleSubmit}>
            Create
          </button>
          <button className="row" id="btn" onClick={()=>{history.push('/')}}>
            Login
          </button>
    </div>
  )
}

export default Register