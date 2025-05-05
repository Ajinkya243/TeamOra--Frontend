import classes from './TasksGrid.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const TasksGrid=({tasks})=>{
    console.log(tasks);
    return(
        <div>
        <div className={classes['grid-header']}>
        <p>Tasks</p>
        <p>Owner</p>
        <p>Tags</p>
        <p>Created At</p>
        <p>Due On</p>
        <p>Status</p>
        <p></p>
        </div>
        <div>
        {tasks.map(el=>(
           <div className={classes['grid-data']}>
            <strong>{el.name}</strong>
            <div className={classes.owner}>
            {el.owners.map(ele=>(
                <div className={classes.owners}>{ele.name.at(0)}</div>
            ))}
            </div>
            <div>
                {el.tags.map(ele=>(
                    <p className={classes.tag}>{ele}</p>
                ))}
            </div>
            <p>{new Date(el.createdAt).toDateString()}</p>
            <p>{new Date(new Date(el.createdAt).setDate(new Date(el.createdAt).getDate()+el.timeToComplete)).toDateString()}</p>
            <p className={`${classes.status} ${classes[el.status]}`}>{el.status}</p>
            <Link ><FontAwesomeIcon className={classes.icon} icon={faArrowRight} size="xl"  /></Link>
           </div> 
        ))}
        </div>
        </div>
    )
}
export default TasksGrid;