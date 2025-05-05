import Navbar from "../../Components/Navbar/Navbar";
import Aside from "../../Components/Aside/Aside";
import {useGlobalState} from "../../utils/context/GlobalStateProvider";
import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import classes from './Dashboard.module.css';
import { useDispatch, useSelector } from "react-redux";
import { addProject, fetchProjects, findProjects } from "../../utils/redux/slice/projectSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import useDebounce from "../../utils/debounce/useDebounce";
import Projects from "../../Components/Projects/Projects";
import { postTask, userTasks } from "../../utils/redux/slice/taskSlice";
import Tasks from "../../Components/Tasks/Tasks";
import { getTeams } from "../../utils/redux/slice/teamSlice";
import { getUsers } from "../../utils/redux/slice/userSlice";

const Dashboard=()=>{
    const [showModal, setShowModal] = useState(false);
    const[showTaskModal,setShowTaskModal]=useState(false);
    const[projectStatus,setProjectStatus]=useState("");
    const[project,setProject]=useState({name:'',description:''});
    const[task,setTask]=useState({});
    const[input,setInput]=useState("");
   const{setTab}=useGlobalState();
   const dispatch=useDispatch();
    const token=localStorage.getItem('token');
    const navigate=useNavigate();
    const {projects,status}=useSelector(state=>state.project);
    const {teams,teamStatus}=useSelector(state=>state.team);
    const {currentUser,users}=useSelector(state=>state.user);
    const {userTask,taskStatus}=useSelector(state=>state.task);
    const debounceInput=useDebounce(input);
    console.log(userTask)
    const handleProjectAdd=async(e)=>{
        e.preventDefault();
        const response=await dispatch(addProject(project));
        if(response.payload.status===200){
            toast.success('Project added')
            setShowModal(false);
            setProject({});
        }
    }

    const handleTaskAdd=async(e)=>{
      e.preventDefault();
      const response=await dispatch(postTask(task));
      console.log(response);
      if(response.payload.status===200){
        toast.success("Task added succesfully");
        setShowTaskModal(false);
      }
      else{
        toast.error("Error occur while adding task")
      }
    }
    useEffect(()=>{
        if(!token){
            navigate("/")
        }
        setTab('dashboard');
        dispatch(getTeams());
        dispatch(getUsers());
    },[]);
    useEffect(()=>{
      
      dispatch(userTasks({id:currentUser.id,status:projectStatus}));
    },[projectStatus]);
    
    useEffect(()=>{
      dispatch(findProjects(debounceInput));
    },[debounceInput]);
    let owners;
    if(task.team){
      const teamMembers=teams.find(el=>el._id===task.team);
      owners=users.filter(el=>teamMembers.members.includes(el._id));
    }
    console.log(owners)
    return (
        <>
          {token && (
            <div>
              <Navbar />
              <Aside />
              <div className={classes.dashboard}>
                <input type="text" placeholder="Search for projects" className={classes['input-search']} onChange={e=>setInput(e.target.value)} value={input}/>
                <div className={classes['project-header']}>
                <h2>Projects :</h2>
                <button onClick={() => setShowModal(true)}>+ Add Project</button>
                </div>
                {showModal && (
        <div className={classes.overlay} onClick={() => setShowModal(false)}>
          <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
            <div className={classes['modal-header']} >
            <h3>Create New Project</h3>
            <FontAwesomeIcon icon={faXmark} onClick={() => setShowModal(false)}/>
            </div>
            <form>
            <label htmlFor="inputName">Project Name</label> <br />
            <input type="text" placeholder="Project Name" onChange={e=>setProject(prev=>({...prev,name:e.target.value}))} value={project.name} /> <br />
            <label htmlFor="inputDesc">Project Description:</label> <br />
            <textarea placeholder="Enter Project Description" id="inputDesc" rows={5} cols={30}onChange={e=>setProject(prev=>({...prev,description:e.target.value}))} value={project.description}></textarea>
            <br />
            <button className={classes['save-btn']} onClick={handleProjectAdd}>{status==='pending' ? <ClipLoader color="white"
  size={20}/>:'Save'}</button>
            <button className={classes['close-btn']} onClick={() => setShowModal(false)}>Close</button>
            </form>
          </div>
        </div>
      )}        
                {status==='pending' && <div className={classes.loader}><ClipLoader size={30}/></div>}
                {status!=='pending' && projects.length >0 && <div className={classes.projects}>
                    {projects.map(el=>(
                        <Projects project={el} />
                    ))}
                    </div>}
                    <div className={classes.task}>
                      <div className={classes['task-header']}>
                    <div className={classes['task-title']}>
                      <h2>My Tasks:</h2>
                      <select name="" id="" className={classes.select} onChange={e=>setProjectStatus(e.target.value)}>
                        <option value="">Filter</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    </div>
                    <button onClick={event=>setShowTaskModal(true)}>+ New Task</button>
                    </div>
                    {showTaskModal && <div className={classes.overlay} onClick={e=>setShowTaskModal(false)}>
                      <div className={classes.modal} onClick={e=>e.stopPropagation()}>
                      <div className={classes['modal-header']} >
                      <h3>Create New Task</h3>
                      <FontAwesomeIcon icon={faXmark} onClick={() => setShowTaskModal(false)}/>
                      </div>
                      <form>
                      <label>Select Project</label> <br />
                      <select required onChange={e=>setTask(prev=>({...prev,project:e.target.value}))}>
                        <option>Select from dropdown</option>
                        {projects.map(el=>(
                          <option value={el._id}>{el.name}</option>
                        ))}
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
                      <button className={classes['close-btn']} onClick={() => setShowModal(false)}>Close</button>
                      </form>
                      </div>
                      </div>}
                    <div>
                    {taskStatus==='pending' && <div className={classes.loader}><ClipLoader size={30}/></div>}
                    {!userTask.length && taskStatus!=='pending' && <p>No such tasks found.</p>}
                    {taskStatus!=='pending' && userTask.length>0 && <div className={classes.tasks}>  
                    {userTask.map(el=>(
                      <Tasks task={el}/>
                    ))}
                    </div>}
                    </div>
                    </div>
              </div>
            </div>
          )}
        </>
      );
      
}
export default Dashboard;