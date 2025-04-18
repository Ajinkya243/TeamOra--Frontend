import { useState } from 'react';
import styles from './Signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../utils/redux/slice/userSlice';
import { toast } from 'react-toastify';

const Signup=()=> {
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();
    const handleSignup=async(event)=>{
        event.preventDefault();
        const response=await dispatch(registerUser({name,email,password}));
        console.log(response);
        if(response.payload.status===201){
          toast.success("Register Successfully")
          setTimeout(()=>{
            navigate("/");
          },1500);
        }
        else{
          toast.error("Something went wrong. try again");
        }
    }
  return (
    <div className={styles.formWrapper}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label htmlFor="signupName">Name:</label><br />
        <input type="text" id="signupName" className={styles.input} required value={name} onChange={event=>setName(event.target.value)} /><br />

        <label htmlFor="signupEmail">Email:</label><br />
        <input type="email" id="signupEmail" className={styles.input} required value={email} onChange={event=>setEmail(event.target.value)} /><br />

        <label htmlFor="signupPassword">Password:</label><br />
        <input type="password" id="signupPassword" className={styles.input} required value={password} onChange={event=>setPassword(event.target.value)} /><br />

        <button type="submit" className={styles.button}>Signup</button>
      </form>
      <p className={styles.linkText}>
        Already User? <Link to="/">Login here</Link>
      </p>
    </div>
  );
}

export default Signup;
