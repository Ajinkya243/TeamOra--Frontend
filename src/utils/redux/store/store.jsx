
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userReducer from '../slice/userSlice';
import {persistReducer,persistStore} from 'redux-persist';

const userPersistConfig={
    key:"user",
    storage,
    whitelist:['user','currentUser']
}

const userPersistedConfig=persistReducer(userPersistConfig,userReducer);


const store=configureStore({
    reducer:{
        user:userPersistedConfig
    }
})

export const persistor=persistStore(store);
export default store;