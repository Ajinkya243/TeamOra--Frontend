import { useEffect, useState } from "react";
import Aside from "../../Components/Aside/Aside";
import Navbar from "../../Components/Navbar/Navbar";
import classes from "./TeamDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTeamMember, getTeamById } from "../../utils/redux/slice/teamSlice";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const TeamDetails=()=>{
    const{id}=useParams();
    const dispatch=useDispatch();
    const {team,teamStatus}=useSelector(state=>state.team);
    const[teamModal,setTeamModal]=useState(false);
    const{users}=useSelector(state=>state.user);
    const[member,setMember]=useState("");
    const memberIds=team.members.map(el=>el._id);
    const filterMembers=users.filter(el=>!memberIds.includes(el._id));
    console.log(filterMembers);
    console.log(team);

    const handleAddMember=async()=>{
        const response=await dispatch(addTeamMember({id:team._id,member}));
        if(response){
        setTeamModal(false);
        toast.success("Team member added successfully")
        dispatch(getTeamById(id));
        }
    }

    useEffect(()=>{
        dispatch(getTeamById(id));
    },[])
    return(
        <>
        <Navbar/>
        <Aside/>
        <div className={classes.team}>
        <Link to="/team">&larr; Back to Teams </Link>
        <div>
            {teamStatus==='pending' && <div className={classes.loader}> <ClipLoader/></div>}
            {teamStatus!=='pending' && team._id && <div>
                <h3>{team.name}</h3>
                <p style={{color:'grey',fontSize:'20px',margin:0}}>Members</p>
                <div>
                    {team.members.map(el=>(
                        <div className={classes.member}>
                        <p>{el.name.at(0)}</p>
                        <p>{el.name}</p>
                        </div>
                    ))}
                </div>
                <button className={classes.btn} onClick={e=>setTeamModal(true)}>+ Add Member</button>
                </div>}
                {teamModal && <div className={classes.overlay} onClick={e=>setTeamModal(false)}>
                    <div className={classes.modal} onClick={e=>e.stopPropagation()}>
                        <div className={classes['modal-header']}>
                            <h3>Add Team Member</h3>
                            <FontAwesomeIcon icon={faX} onClick={e=>setTeamModal(false)}/>
                        </div>
                        <>
                        <p>Member Name</p>
                        <select required onChange={e=>setMember(e.target.value)}>
                            <option>Select the member</option>
                        {filterMembers.map(el=>(
                            <option value={el._id}>{el.name}</option>
                        ))}
                        </select>
                        <div className={classes.btns}>
                            <button className={classes['cancel-btn']} onClick={e=>setTeamModal(false)}>Cancel</button>
                            <button className={classes['add-btn']} onClick={handleAddMember}>Add</button>
                        </div>
                        </>
                    </div>
                </div>}
        </div>
        </div>
        </>
    )
}
export default TeamDetails;