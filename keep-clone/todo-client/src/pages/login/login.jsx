import React from 'react'
import { useState,useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import './login.css';

const Login = () => {




    const history=useHistory();
    useEffect(() => {
        const w=JSON.parse(localStorage.getItem("user"))
        if(w){
        history.push('/dashboard');
        }
      }, [])
    const[user,setuser]=useState(null);
    const [errormessage, seterror] = useState(null);
    const handleChange = (e) => {
        const value = e.target.value;
        setuser({ ...user, [e.target.name]: value });
      };

        const handleSubmit = async () => {
            try {
              const res = await axios.post("https://mern-todo-auntentication.herokuapp.com/api/auth/login",user);

              console.log(res.status);
              seterror(null)  
              localStorage.setItem("user",JSON.stringify(res.data));
              
              history.push('/dashboard');
        

            } catch (err) {
                console.error("Error response:");
                seterror(err.response.data)
                console.error(err.response.data);    // ***
            }
        
          }

  return (
    
    <div className="loginform" id="loginform">
      <h2 className="error"> Login </h2>
        {errormessage && (
        <p className="error"> {errormessage} </p>
      )}
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
            className="row"
            name="password"

            onChange={handleChange}
          />
          <button className="row" id="btn" onClick={handleSubmit}>
            Login
          </button>
          <button className="row" id="btn" onClick={()=>{history.push('/register')}}>
            Register
          </button>
    </div>
  )
}

export default Login