import { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { loginUser, setCurrentUser } from '../../utils/redux/slice/userSlice';
import {jwtDecode} from "jwt-decode";
import { toast } from 'react-toastify';

const Login=()=> {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const dispatch=useDispatch();
    const textCredentials={email:'ajinkya@test.com',password:'ajinkya'}
    const handleLogin=async(event)=>{
        event.preventDefault();
        const token=await dispatch(loginUser({email,password}));
        if(token.payload){
          toast.success("Login Succesfully")
          localStorage.setItem('token',token.payload);
        const decode=jwtDecode(token.payload);
        dispatch(setCurrentUser(decode));
        setEmail("");
        setPassword("");
        }
        else{
          toast.error("Invalid Credentials");
        }
        
    }
    const handleTestCredentials=()=>{
      setEmail(textCredentials.email);
      setPassword(textCredentials.password);
    }
  return (
    <div className={styles.formWrapper}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="loginEmail">Email:</label><br />
        <input type="email" id="loginEmail" className={styles.input} required value={email} onChange={event=>setEmail(event.target.value)} /><br />

        <label htmlFor="loginPassword">Password:</label><br />
        <input type="password" id="loginPassword" className={styles.input} required value={password} onChange={event=>setPassword(event.target.value)} /><br />

        <button type="submit" className={styles.button}>Login</button>
      </form>
      <p className={styles.linkText}>
        New User? <Link to="/signup">Sign Up</Link>
      </p>
      <button className={styles.button} onClick={handleTestCredentials}>Test Credentials</button>
    </div>
  );
}

export default Login;
