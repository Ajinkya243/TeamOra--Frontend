import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTeams=createAsyncThunk("get/teams",async()=>{
    const response=await axios.get("https://team-ora-backend.vercel.app/teams");
    console.log(response.data);
    return response.data;
})

const teamSlice=createSlice({
    name:"team",
    initialState:{
        teams:[],
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
    }
})
export default teamSlice.reducer;