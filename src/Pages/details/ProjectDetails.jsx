import { useParams } from "react-router-dom";
import Aside from "../../Components/Aside/Aside";
import Navbar from "../../Components/Navbar/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectById } from "../../utils/redux/slice/projectSlice";
import { ClipLoader } from "react-spinners";
import classes from './ProjectDetails.module.css';
import { getTaskByProject } from "../../utils/redux/slice/taskSlice";
import TasksGrid from "../../Components/Tasks/TasksGrid";

const ProjectDetails=()=>{
    const {id}=useParams();
    const dispatch=useDispatch();
    const{status,project}=useSelector(state=>state.project);
    const{projectTask}=useSelector(state=>state.task);
    useEffect(()=>{
        dispatch(getProjectById(id));
        dispatch(getTaskByProject(id));
    },[]);
    console.log(project);
    return(
        <>
        <Navbar/>
        <Aside/>
        <div className={classes.details}>
            {status==="pending" && <div className={classes.loader}><ClipLoader /></div>}
        
        
            {status!=='pending' && project._id && <div>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                {!projectTask.length && <h3>No current task for this project!</h3>}
                {projectTask.length>0 && <TasksGrid tasks={projectTask}/>}
                </div>}
        </div>        
        
        </>
    )
}
export default ProjectDetails;