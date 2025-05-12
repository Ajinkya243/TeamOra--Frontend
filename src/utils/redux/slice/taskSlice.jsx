import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const userTasks=createAsyncThunk("user/tasks",async({id,status})=>{
    
    const response=await axios.get("https://team-ora-backend.vercel.app/task/user",{params:{id,status}});
    return response.data;
})

export const postTask=createAsyncThunk("post/task",async(task)=>{
    const response=await axios.post("https://team-ora-backend.vercel.app/task/add",task);
    return response;
})

export const getTaskByProject=createAsyncThunk("get/taskByProject",async({id,debounceInput})=>{
    const response=await axios.get("https://team-ora-backend.vercel.app/task/project",{params:{id,debounceInput}});
    return response.data;
})

export const getTaskById=createAsyncThunk('get/taskById',async(id)=>{
    const response=await axios.get(`https://team-ora-backend.vercel.app/task/${id}`);
    return response.data;
})
export const setTaskComplete=createAsyncThunk("complete/task",async(id)=>{
    const response=await axios.post(`https://team-ora-backend.vercel.app/task/${id}`);
    return response.data;
})
export const getAllTasks=createAsyncThunk("get/allTasks",async()=>{
    const response=await axios.get("https://team-ora-backend.vercel.app/tasks");
    return response.data
})

const taskSlice=createSlice({
    name:'task',
    initialState:{
        userTask:[],
        projectTask:[],
        totalTasks:[],
        task:{},
        taskStatus:'idle',
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(userTasks.pending,state=>{
            state.taskStatus="pending"
        })
        .addCase(userTasks.fulfilled,(state,action)=>{
            state.taskStatus="fulfilled"
            state.userTask=action.payload
        })
        .addCase(userTasks.rejected,state=>{
            state.taskStatus="rejected"
        })
        .addCase(postTask.pending,state=>{
            state.taskStatus="pending"
        })
        .addCase(postTask.fulfilled,state=>{
            state.taskStatus="fulfilled"
        })
        .addCase(getTaskByProject.pending,state=>{
            state.taskStatus="pending"
        })
        .addCase(getTaskByProject.fulfilled,(state,action)=>{
            state.taskStatus='fulfilled'
            state.projectTask=action.payload
        })
        .addCase(getTaskById.pending,state=>{
            state.taskStatus="pending"
        })
        .addCase(getTaskById.fulfilled,(state,action)=>{
            state.taskStatus="fulfilled"
            state.task=action.payload
        })
        .addCase(setTaskComplete.pending,state=>{
            state.status="pending"
        })
        .addCase(setTaskComplete.fulfilled,(state,action)=>{
            state.status="fullfiled"
            state.task=action.payload;
        })
        .addCase(getAllTasks.fulfilled,(state,action)=>{
            state.totalTasks=action.payload
        })
    }
})

export default taskSlice.reducer;