import { useEffect, useState } from "react"
import Aside from "../../Components/Aside/Aside"
import Navbar from "../../Components/Navbar/Navbar"
import { useGlobalState } from "../../utils/context/GlobalStateProvider"
import classes from './Teams.module.css';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { addTeam, getTeams } from "../../utils/redux/slice/teamSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Teams=()=>{
    const{setTab}=useGlobalState();
    const{teams,teamStatus}=useSelector(state=>state.team);
    const dispatch=useDispatch();
    const[teamsModal,setTeamsModal]=useState(false);
    const{users}=useSelector(state=>state.user);
    const[members,setMembers]=useState([]);
    const[name,setName]=useState("");
    console.log(users);
    console.log(teams);
    const handleMembers=(e)=>{
        const id=e.target.value
        if(e.target.checked){
          setMembers(prev=>[...prev,id]);  
        }
        else{
            setMembers(prev=>prev.filter(el=>el!==id));
        }
    }

    const handleAddTeam=async()=>{
        if(members.length && name){
             const response=await dispatch(addTeam({name,members}));
        if(response){
            toast.success("Team added successfully");
            setTeamsModal(false);
            dispatch(getTeams());
        }
        }
        else{
            {!members.length ?toast.error("Please select at least one member."):toast.error("Please enter the team name")}
        }
       
    }

    useEffect(()=>{
        setTab('team');
        dispatch(getTeams());
    },[])
    console.log('members',members)
    
    return(
        <>
        <Navbar/>
        <Aside/>
        <div className={classes.team}>
            {teamStatus==='pending' && <div className={classes.loader}><ClipLoader/></div>}
            {teamStatus!== 'pending' &&
            <><div className={classes['team-header']}>
            <h2>Teams</h2>
            <button className={classes.btn} onClick={()=>setTeamsModal(true)}>+ Add Team</button>
            </div>
            <div className={classes['teams-grid']}>
            {teams.map(el=>(
                <Link to={`/team/${el._id}`}>
                  <h3>{el.name}</h3>  
                  <p>{el.members.length} members</p>
                </Link>
            ))}
            </div></>}
        </div>
        {teamsModal &&<div className={classes.overlay} onClick={()=>setTeamsModal(false)}>
            <div className={classes.modal} onClick={e=>e.stopPropagation()}>
            <div className={classes['modal-header']}>
            <h3>Create new team</h3>
            <FontAwesomeIcon icon={faX} onClick={()=>setTeamsModal(false)}/>
            </div>
            <br />
            <div>
                <label htmlFor="inputName">Enter team name:</label>
                <input type="text" required onChange={e=>setName(e.target.value)}/>
                <br />
                <label htmlFor="">Add members:</label>
                <div className={classes['members-grid']}>
                {users.map(el=>(
                    <div style={{display:'flex',alignItems:'center'}}>
                    <input type="checkbox" value={el._id} onChange={handleMembers}/>{el.name}
                    
                    </div>
                ))}
                </div>
                <div className={classes.btns}>
                <button className={classes['cancel-btn']} onClick={e=>setTeamsModal(false)}>Cancel</button>
                <button className={classes['add-btn']} onClick={handleAddTeam}>Add</button>
                </div>
                
            </div>
            </div>
        </div>}
        </>
    )
}
export default Teams;