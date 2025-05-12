import { useEffect } from "react";
import Aside from "../../Components/Aside/Aside";
import Navbar from "../../Components/Navbar/Navbar";
import { useGlobalState } from "../../utils/context/GlobalStateProvider";
import classes from './Report.module.css';
import {Chart as Chartjs,ArcElement, Tooltip, Legend,Title, plugins, CategoryScale,LinearScale,BarElement} from 'chart.js';
import {Doughnut, Bar, Pie} from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../utils/redux/slice/taskSlice";
Chartjs.register(ArcElement, Tooltip, Legend,Title,plugins,CategoryScale,LinearScale,BarElement);

const Report=()=>{
    const{setTab}=useGlobalState();
    const{totalTasks}=useSelector(state=>state.task);
    const dispatch=useDispatch();
    
        const completedTask=totalTasks.filter(el=>el.status==='Completed');
    const taskPerProject=totalTasks.reduce((acc,cur)=>{
        acc[cur.project.name]=(acc[cur.project.name]? acc[cur.project.name] :0) + 1;
        return acc;
    },{})
    const generateColors = (num) => {
  return Array.from({ length: num }, () =>
    `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
  );
};
    const labels = Object.keys(taskPerProject);
    const dataValues = Object.values(taskPerProject); 
    const backgroundColors = generateColors(labels.length);

    const donughtChartData={
        labels:['Completed','Workinng'],
        datasets:[{
            label:'Total Tasks',
            data:[completedTask.length,totalTasks.length-completedTask.length],
            backgroundColor:["green","yellow"],
            borderColor:["green","yellow"],
            borderWidth:2
        }] 
    }
    const donughtChartOptions={
                responsive:true,
                maintainAspectRatio:false,
                cutout:'60%',
                plugins:{
                    title:{
                        display:true,
                        text:"Total Tasks (Completed vs Working)",
                        font:{size:16},
                        padding:{top:10,bottom:10},
                        color:"#333333"
                    }
                }
    }

    const barChartData={
        labels:totalTasks.map(el=>el.name),
        datasets:[{
            label:'Days',
            data:totalTasks.map(el=>el.timeToComplete),
            borderWidth:2
        }]
    }

    const barChartOptions={
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
            title:{
                display:true,
                text:'Required Days to Complete',
                font:{size:16},
                padding:{top:10,bottom:10},
                color:"#333333"
            }
        }
    }

    const pieChartData={
    labels,
    datasets: [
      {
        label: 'Tasks per Project',
        data: dataValues,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };
  const pieChartOptions = {
    responsive:true,
    plugins: {
         title:{
    display:true,
    text:"Total Tasks Per Project",
    font:{size:16},
    padding:{top:10,bottom:10},
    color:"#333333"
    },
      legend: {
        position: 'bottom',
      },
    },
  };
    
    

    useEffect(()=>{
        setTab('report');
        dispatch(getAllTasks());
    },[])
    return(
        <>
        <Navbar/>
        <Aside/>
        <div className={classes.report}>
        <h2>Reports</h2>
        <hr />
        <div className={classes.chart}>
        <div className={classes.donught}>
        <Doughnut data={donughtChartData} options={donughtChartOptions}/>
        </div>
        <div className={classes.bar}>
            <Bar data={barChartData} options={barChartOptions}/>
        </div>
        <div className={classes.pie}>
        <Pie data={pieChartData} options={pieChartOptions}/>
        </div>
        </div>
        </div>
        </>
    )
}
export default Report;