import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { loginUser, setCurrentUser } from '../../utils/redux/slice/userSlice';
import {jwtDecode} from "jwt-decode";
import { toast } from 'react-toastify';
import {ClipLoader} from 'react-spinners';
import axios from 'axios';

const Login=()=> {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const{status}=useSelector(state=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const textCredentials={email:'ajinkya@test.com',password:'ajinkya'}
    const token=localStorage.getItem('token');
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
        navigate("/dashboard");
        }
        else{
          toast.error("Invalid Credentials");
        }
        
    }
    const handleTestCredentials=()=>{
      setEmail(textCredentials.email);
      setPassword(textCredentials.password);
    }
  

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get("https://team-ora-backend.vercel.app/token/verify", {
            headers: {
              Authorization: token 
            }
          });
  
          if (response.status === 200 && response.data) {
            dispatch(setCurrentUser(response.data));
            navigate("/dashboard");
          } else {
            localStorage.removeItem("token");
          }
  
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
        }
      }
    };
  
    verifyToken();
  }, []);
  

  return (
    <>
    {!token && <div className={styles.formWrapper}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="loginEmail">Email:</label><br />
        <input type="email" id="loginEmail" className={styles.input} required value={email} onChange={event=>setEmail(event.target.value)} /><br />

        <label htmlFor="loginPassword">Password:</label><br />
        <input type="password" id="loginPassword" className={styles.input} required value={password} onChange={event=>setPassword(event.target.value)} /><br />

        <button type="submit" className={styles.button}>{status === 'pending'? <ClipLoader
  color="white"
  size={20}
/> : "Login"}</button>
      </form>
      <p className={styles.linkText}>
        New User? <Link to="/signup">Sign Up</Link>
      </p>
      <button className={styles.button} onClick={handleTestCredentials}>Test Credentials</button>
    </div>}
    </>
  );
}

export default Login;
