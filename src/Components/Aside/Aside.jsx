import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHouseChimney, faList, faPeopleGroup, faBolt, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import classes from './Aside.module.css';
import {useGlobalState} from "../../utils/context/GlobalStateProvider";
const Aside=()=>{
    const{tab}=useGlobalState();
    return(
        <div className={classes.aside}>
         <Link to="/dashboard" className={`${classes.link} ${tab==='dashboard'?classes.active:''}`}><FontAwesomeIcon className={classes.icon} icon={faHouseChimney} size="xl"  /><span>Home</span></Link>
         <Link to="/project" className={`${classes.link} ${tab==="project"?classes.active:''}`}><FontAwesomeIcon className={classes.icon} icon={faList} size="xl"  /><span>Projects</span></Link>
         <Link to="/team" className={`${classes.link} ${tab==='team'?classes.active:''}`}><FontAwesomeIcon className={classes.icon} icon={faPeopleGroup} size="xl"  /><span>Team</span></Link>
         <Link className={classes.link}><FontAwesomeIcon className={classes.icon} icon={faBolt} size="xl"  /><span>Reports</span></Link>
         <Link className={classes.link}><FontAwesomeIcon className={classes.icon} icon={faUser} size="xl"  /><span>Profile</span></Link>
        </div>
    )
}
export default Aside;