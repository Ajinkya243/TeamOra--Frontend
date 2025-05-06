
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userReducer from '../slice/userSlice';
import projectReducer from '../slice/projectSlice';
import taskReducer from '../slice/taskSlice';
import teamReducer from '../slice/teamSlice';
import {persistReducer,persistStore} from 'redux-persist';

const userPersistConfig={
    key:"user",
    storage,
    whitelist:['users','currentUser']
}
const projectPersistConfig={
    key:"project",
    storage,
    whitelist:['projects','project']
}
const taskPersistConfig={
    key:"task",
    storage,
    whitelist:['userTask','projectTask']
}
const teamPersistConfig={
    key:'team',
    storage,
    whitelist:['teams','team']
}

const userPersistedConfig=persistReducer(userPersistConfig,userReducer);
const projectPersistedConfig=persistReducer(projectPersistConfig,projectReducer);
const taskPersistedConfig=persistReducer(taskPersistConfig,taskReducer);
const teamPersistedConfig=persistReducer(teamPersistConfig,teamReducer);



const store=configureStore({
    reducer:{
        user:userPersistedConfig,
        project:projectPersistedConfig,
        task:taskPersistedConfig,
        team:teamPersistedConfig
    }
})

export const persistor=persistStore(store);
export default store;