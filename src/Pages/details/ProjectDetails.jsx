import { useParams } from "react-router-dom";
import Aside from "../../Components/Aside/Aside";
import Navbar from "../../Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectById } from "../../utils/redux/slice/projectSlice";
import { ClipLoader } from "react-spinners";
import classes from './ProjectDetails.module.css';
import { getTaskByProject } from "../../utils/redux/slice/taskSlice";
import TasksGrid from "../../Components/Tasks/TasksGrid";
import useDebounce from "../../utils/debounce/useDebounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { postTask } from "../../utils/redux/slice/taskSlice";
import {toast} from 'react-toastify'
import { useGlobalState } from "../../utils/context/GlobalStateProvider";

const ProjectDetails=()=>{
    const{setTab}=useGlobalState();
    const {id}=useParams();
    const dispatch=useDispatch();
    const{status,project}=useSelector(state=>state.project);
    const{projectTask,taskStatus}=useSelector(state=>state.task);
    const {teams}=useSelector(state=>state.team);
    const {users}=useSelector(state=>state.user);
    const[input,setInput]=useState("");
    const[showTaskModal,setShowTaskModal]=useState(false);
    const[task,setTask]=useState({project:project._id});
    const debounceInput=useDebounce(input);

    const handleTaskAdd=async(e)=>{
          e.preventDefault();
          const response=await dispatch(postTask(task));
          console.log(response);
          if(response.payload.status===200){
            toast.success("Task added succesfully");
            setShowTaskModal(false);
            dispatch(getProjectById(id));
          }
          else{
            toast.error("Error occur while adding task")
          }
        }
    useEffect(()=>{
        dispatch(getProjectById(id));
        setTab('project')
    },[]);
    useEffect(()=>{
        dispatch(getTaskByProject({id,debounceInput}));
    },[debounceInput]);
    console.log(project);
    let owners;
    if(task.team){
      const teamMembers=teams.find(el=>el._id===task.team);
      console.log(teamMembers);
      const memberIds = teamMembers.members.map(member => member._id);
    owners = users.filter(user => memberIds.includes(user._id));
      console.log(owners);
    }
    return(
        <>
        <Navbar/>
        <Aside/>
        <div className={classes.details}>
            {status==="pending" && <div className={classes.loader}><ClipLoader /></div>}
        
        
            {status!=='pending' && project._id && <div>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <div className={classes['project-actions']}>
                <input type="text" style={{width:'50%'}} placeholder="Search for the task" onChange={(e)=>setInput(e.target.value)}/>
                <br /><br />
                <button className={classes.btn} onClick={()=>setShowTaskModal(true)}>+ Add Task</button>
                </div>
                 {projectTask.length>0 ? <TasksGrid tasks={projectTask}/>:<p>No such tasks found!</p>}
                 {showTaskModal && <div className={classes.overlay} onClick={e=>setShowTaskModal(false)}>
                                       <div className={classes.modal} onClick={e=>e.stopPropagation()}>
                                       <div className={classes['modal-header']} >
                                       <h3>Create New Task</h3>
                                       <FontAwesomeIcon icon={faXmark} onClick={() => setShowTaskModal(false)}/>
                                       </div>
                                       <form>
                                       <label>Select Project</label> <br />
                                       <select required onChange={e=>setTask(prev=>({...prev,project:e.target.value}))}>
                                        <option value={project._id}>{project.name}</option>
                                       </select>
                                       <br />
                                       <label htmlFor="inputName">Task Name</label><br />
                                       <input type="text" id="inputName" onChange={e=>setTask(prev=>({...prev,name:e.target.value}))}/><br />
                                       <label htmlFor="">Select Team:</label>
                                       <select required onChange={e=>setTask(prev=>({...prev,team:e.target.value}))}>
                                         <option>Select from dropdown</option>
                                         {teams.map(el=>(
                                           <option value={el._id}>{el.name}</option>
                                         ))}
                                       </select><br />
                                       <label htmlFor="inputOwners">Owners:</label>
                                       <select required disabled={!task.team} onChange={e=>setTask(prev=>({...prev,owners:e.target.value}))}>
                                         <option>Select owner</option>
                                         {owners?.map(el=>(
                                           <option value={el._id}>{el.name}</option>
                                         ))}
                                       </select><br />
                                       <label>Tags:</label>
                                       <select required onChange={e=>setTask(prev=>({...prev,tags:e.target.value}))}>
                                         <option>Select the tag</option>
                                         <option value="Fix">Fix</option>
                                         <option value="Feature">Feature</option>
                                         <option value="Support">Support</option>
                                         <option value="UI">UI</option>
                                       </select><br />
                                       <label htmlFor="inputTime">Time to Complete:</label> <br />
                                       <input type="number" onChange={e=>setTask(prev=>({...prev,timeToComplete:+e.target.value}))}/>
                                       <br />
                                       <label htmlFor="inputStatus">Select Status:</label>
                                       <select required>
                                         <option>Select status</option>
                                         <option value="To Do">To Do</option>
                                         <option value="In Progress">In Progress</option>
                                         <option value="Completed">Completed</option>
                                         <option value="Blocked">Blocked</option>
                                       </select>
                                       <button className={classes['save-btn']} onClick={handleTaskAdd}>{taskStatus==='pending' ? <ClipLoader color="white"
                                       size={20}/>:'Save'}</button>
                                       <button className={classes['close-btn']} onClick={() => setShowTaskModal(false)}>Close</button>
                                       </form>
                                       </div>
                                       </div>}
                </div>}
        </div>        
        
        </>
    )
}
export default ProjectDetails;