import { useNavigate } from "react-router-dom";
import classes from './Project.module.css';
const Projects=({project})=>{
    const navigate=useNavigate();
    const handleDetails=(id)=>{
        navigate(`/project/details/${id}`);
    }
    return(
        <div className={classes.details}>
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                            <button className={classes.btn} onClick={()=>handleDetails(project._id)}>Details</button>
                        </div>
    )
}
export default Projects;