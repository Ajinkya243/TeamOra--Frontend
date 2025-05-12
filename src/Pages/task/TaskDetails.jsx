import { useParams } from "react-router-dom"
import Aside from "../../Components/Aside/Aside"
import Navbar from "../../Components/Navbar/Navbar"
import classes from './TaskDetails.module.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskById, setTaskComplete } from "../../utils/redux/slice/taskSlice";
import { ClipLoader } from "react-spinners";
import {Link} from 'react-router-dom';
import { toast } from "react-toastify";

const TaskDetails=()=>{
    const {id}=useParams();
    const{task,taskStatus,status}=useSelector(state=>state.task);
    const dispatch=useDispatch();
    const handleStatus=async()=>{
        const response=await dispatch(setTaskComplete(id));
        toast.success("Task mark as completed");
        dispatch(getTaskById(id));
    }
    useEffect(()=>{
        dispatch(getTaskById(id));
    },[])
    return(
        <>
        <Navbar/>
        <Aside/>
        <div className={classes.task}>
         {task._id &&<Link to={`/project/details/${task.project._id}`}>&larr; Back to project</Link>}   
        <h2>Task Details</h2>
        {taskStatus==='pending' && <div className={classes.loader}><ClipLoader/></div>}
        {taskStatus!=='pending' && task._id && <div className={classes["task-card"]}>
  <div className={classes["task-header"]}>
    <h2>{task.name}</h2>
    <p><strong>Project:</strong> {task.project.name}</p>
  </div>

  <div className={classes["task-section"]}>
    <h3>Owners:</h3>
    {task.owners.map((el, index) => (
      <div key={index} className={classes["owner"]}>
        <p><strong>Name:</strong> {el.name}</p>
        <p><strong>Email:</strong> {el.email}</p>
      </div>
    ))}
  </div>

  <div className={classes["task-section"]}>
    <h3>Tags:</h3>
    <div className={classes["tags"]}>
      {task.tags.map((el, index) => (
        <span key={index} className={classes["tag"]}>{el}</span>
      ))}
    </div>
  </div>

  <div className={classes["task-dates"]}>
    <p><strong>Created At:</strong> {new Date(task.createdAt).toDateString()}</p>
    <p>
      <strong>Due On:</strong>{' '}
      {new Date(new Date(task.createdAt).setDate(new Date(task.createdAt).getDate() + task.timeToComplete)).toDateString()}
    </p>
    <p><strong>Status:</strong> {task.status}</p>
    {task.status!=='Completed' && <button className={classes['complete-btn']} onClick={handleStatus}>{status==='pending' ?<ClipLoader size={14}/>:'Mark as Completed'}</button>}
  </div>
</div>
}
        </div>
        </>
    )
}
export default TaskDetails;