import { useSelector } from "react-redux";
import classes from './Navbar.module.css';
import {useNavigate} from 'react-router-dom';
const Navbar=()=>{
    const {currentUser}=useSelector(state=>state.user);
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate("/");
    }
    
    return(
        <>
        <div className={classes.navbar}>
            <h2>TeamOra</h2>
            <div><span>{currentUser.name}</span><button onClick={handleLogout}>Logout</button></div>
        </div>
        </>
    )
}
export default Navbar;