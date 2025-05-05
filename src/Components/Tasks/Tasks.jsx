import classes from './Tasks.module.css';

const Tasks=({task})=>{
    return(
        <div className={classes.task}>
            <span className={`${classes.status} ${classes[task.status]}`}>{task.status}</span>
            <h3>{task.name}</h3>
            <p>
  Due on: {
    new Date(
      new Date(task.createdAt).setDate(
        new Date(task.createdAt).getDate() + task.timeToComplete
      )
    ).toDateString()
  }
</p>
<p>Owners:</p>
{task.owners.map(el=>(
    <p className={classes['name']}><span className={classes['name-field']}>{el.name.at(0)}</span> {el.name}</p>

))}
</div>
    )
}
export default Tasks;