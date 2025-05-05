import axios from 'axios'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const loginUser=createAsyncThunk("login/user",async({email,password})=>{
    const response=await axios.post("https://team-ora-backend.vercel.app/user/login",{email,password});
    return response.data;
})

export const registerUser=createAsyncThunk("register/user",async({name,email,password})=>{
    const response=await axios.post("https://team-ora-backend.vercel.app/user/add",{name,email,password});
    return response;
})

export const getUsers=createAsyncThunk("get/users",async()=>{
    const response=await axios.get("https://team-ora-backend.vercel.app/user/list",{headers:{
        'Authorization':localStorage.getItem('token')
    }});
    return response.data
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
        .addCase(registerUser.pending,state=>{
            state.status="pending"
        })
        .addCase(registerUser.fulfilled,state=>{
            state.status="fulfilled"
        })
        .addCase(getUsers.fulfilled,(state,action)=>{
            state.users=action.payload;
        })
    }
})
export const {setCurrentUser}=userSlice.actions;
export default userSlice.reducer;