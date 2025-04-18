import axios from 'axios'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const loginUser=createAsyncThunk("login/user",async({email,password})=>{
    const response=await axios.post("https://team-ora-backend.vercel.app/user/login",{email,password});
    return response.data;
})


export const userSlice=createSlice({
    name:'user',
    initialState:{
        users:[],
        currentUser:{},
        status:'idle',
        error:null
    },
    reducers:{
        setCurrentUser:(state,action)=>{
            state.currentUser=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,state=>{
            state.status="pending"
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.status="fulfilled"
        })
        .addCase(loginUser.rejected,state=>{
            state.status="rejected"
        })
    }
})
export const {setCurrentUser}=userSlice.actions;
export default userSlice.reducer;