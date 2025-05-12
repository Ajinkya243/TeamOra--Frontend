import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchProjects=createAsyncThunk('fetch/projects',async()=>{
    const response=await axios.get("https://team-ora-backend.vercel.app/project");
    return response.data;
})
export const addProject=createAsyncThunk("add/project",async(project)=>{
    const response=await axios.post("https://team-ora-backend.vercel.app/project/add",project);
    return response;
})
export const findProjects=createAsyncThunk("find/project",async(str)=>{
    const response=await axios.get(`https://team-ora-backend.vercel.app/project/${str}`);
    return response.data;
})
export const getProjectById=createAsyncThunk("get/projectById",async(id)=>{
    const response=await axios.get(`https://team-ora-backend.vercel.app/projectId/${id}`);
    return response.data;
})

const projectSlice=createSlice({
    name:'project',
    initialState:{
        projects:[],
        project:{},
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProjects.pending,state=>{
            state.status="pending"
        })
        .addCase(fetchProjects.fulfilled,(state,action)=>{
            state.status='fulfilled'
            state.projects=action.payload
        })
        .addCase(fetchProjects.rejected,state=>{
            state.status="rejected"
        })
        .addCase(addProject.pending,state=>{
            state.status="pending"
        })
        .addCase(addProject.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.projects.push(action.payload.data);
        })
        .addCase(addProject.rejected,state=>{
            state.status='rejected'
        })
        .addCase(findProjects.pending,state=>{
            state.status="pending"
        })
        .addCase(findProjects.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.projects=action.payload
        })
        .addCase(getProjectById.pending,state=>{
            state.status="pending"
        })
        .addCase(getProjectById.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.project=action.payload  
        })
    }
})

export default projectSlice.reducer;