import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTeams=createAsyncThunk("get/teams",async()=>{
    const response=await axios.get("https://team-ora-backend.vercel.app/teams");
    return response.data;
})
export const getTeamById=createAsyncThunk("get/teamById",async(id)=>{
    const response=await axios.get(`https://team-ora-backend.vercel.app/team/${id}`);
    return response.data;
})
export const addTeamMember=createAsyncThunk('add/teamMember',async({id,member})=>{
    const response=await axios.post(`https://team-ora-backend.vercel.app/team/member`,{id,member});
    return response.data;
})
export const addTeam=createAsyncThunk("add/team",async(obj)=>{
    const response=await axios.post("https://team-ora-backend.vercel.app/team",obj);
    return response.data;
})

const teamSlice=createSlice({
    name:"team",
    initialState:{
        teams:[],
        team:{},
        teamStatus:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getTeams.pending,state=>{
            state.teamStatus="pending"
        })
        .addCase(getTeams.fulfilled,(state,action)=>{
            state.teamStatus="fulfilled"
            state.teams=action.payload
        })
        .addCase(getTeams.rejected,state=>{
            state.teamStatus="rejected"
        })
        .addCase(getTeamById.pending,state=>{
            state.teamStatus="pending"
        })
        .addCase(getTeamById.fulfilled,(state,action)=>{
            state.teamStatus="fulfilled"
            state.team=action.payload
        })
        .addCase(addTeamMember.pending,state=>{
            state.teamStatus='pending'
        })
        .addCase(addTeam.fulfilled,(state,action)=>{
            state.teams.push(action.payload)
        })
        .addCase(addTeamMember.fulfilled,(state,action)=>{
            state.teamStatus='fulfilled'
            state.team=action.payload
        })
    }
})
export default teamSlice.reducer;