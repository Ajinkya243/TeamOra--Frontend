import { useEffect, useState } from "react";
import Aside from "../../Components/Aside/Aside";
import Navbar from "../../Components/Navbar/Navbar";
import { useGlobalState } from "../../utils/context/GlobalStateProvider";
import classes from './Project.module.css';
import { useDispatch, useSelector } from "react-redux";
import Projects from "../../Components/Projects/Projects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import { addProject } from "../../utils/redux/slice/projectSlice";
import { toast } from "react-toastify";

const Project=()=>{
    const{setTab}=useGlobalState();
    const{projects,status}=useSelector(state=>state.project);
    const[project,setProject]=useState({name:'',description:''});
    const[showModal,setShowModal]=useState(false);
    const dispatch=useDispatch();
    const handleProjectAdd=async(e)=>{
         e.preventDefault();
                const response=await dispatch(addProject(project));
                if(response.payload.status===200){
                    toast.success('Project added')
                    setShowModal(false);
                    setProject({});
                }
    }
    useEffect(()=>{
        setTab('project');
    },[])
    return(
        <>
        <Navbar/>
        <Aside/>
        <div className={classes.project}>
        <div className={classes['project-header']}>
        <h2>List Of Projects</h2>
        <button className={classes.btn} onClick={()=>setShowModal(true)}>+ Add Project</button>
        </div>
        <div className={classes['project-grid']}>
        {projects.map(el=>(
            <Projects  project={el}/>
        ))}
        </div>
        {showModal &&<div className={classes.overlay} onClick={() => setShowModal(false)}>
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
                </div>}
        </div>
        </>
    )
}
export default Project;