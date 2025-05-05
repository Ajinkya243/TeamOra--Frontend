import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const userTasks=createAsyncThunk("user/tasks",async(id)=>{
//     const response=await axios(`https://team-ora-backend.vercel.app/task/user/${id}`);
//     console.log(response.data);
//     return response.data;
// })

export const userTasks=createAsyncThunk("user/tasks",async({id,status})=>{
    console.log(id,status);
    const response=await axios("https://team-ora-backend.vercel.app/task/user",{params:{id,status}});
    console.log(response);
    return response.data;
})

export const postTask=createAsyncThunk("post/task",async(task)=>{
    const response=await axios.post("https://team-ora-backend.vercel.app/task/add",task);
    console.log(response);
    return response;
})

const taskSlice=createSlice({
    name:'task',
    initialState:{
        userTask:[],
        taskStatus:'idle',
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
    }
})

export default taskSlice.reducer;