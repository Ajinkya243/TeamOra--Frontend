import { useEffect } from "react"
import Aside from "../../Components/Aside/Aside"
import Navbar from "../../Components/Navbar/Navbar"
import { useGlobalState } from "../../utils/context/GlobalStateProvider"
import { useSelector } from "react-redux"
import classes from './Profile.module.css'
import Tasks from "../../Components/Tasks/Tasks"

const Profile=()=>{
    const{setTab}=useGlobalState();
    const {userTask}=useSelector(state=>state.task);
    const{currentUser}=useSelector(state=>state.user);
    console.log(userTask);
    useEffect(()=>{
        setTab('profile');
    },[])
    return(
        <>
        <Navbar/>
        <Aside/>
        <div className={classes.profile}>
        <h2>Profile Details</h2>
        <div>
            <p><strong>Name : </strong><span>{currentUser.name}</span></p>
            <p><strong>Email : </strong><span>{currentUser.email}</span></p>
            <p><strong>Total handling task : </strong>{userTask.length}</p>
            <h3>List of Tasks:</h3>
            <div className={classes.tasks}>
            {userTask.map(el=>(
               <Tasks task={el}/>
            ))}
            </div>
        </div>
        </div>
        </>
    )
}

export default Profile;