import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/login/Login';
import Signup from './Pages/signup/Signup';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './utils/redux/store/store';
import store from './utils/redux/store/store';
import { Provider } from 'react-redux';
import {ToastContainer} from 'react-toastify';
import Dashboard from './Pages/dashboard/Dashboard';
import GlobalStateProvider from './utils/context/GlobalStateProvider';
import ProjectDetails from './Pages/details/ProjectDetails';
import Teams from './Pages/team/Teams';
import TeamDetails from './Pages/team/TeamDetails';
import Project from './Pages/details/Project';
import TaskDetails from './Pages/task/TaskDetails';
function App() {
  return (
    <>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStateProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/project" element={<Project/>} />
      <Route path="/project/details/:id" element={<ProjectDetails/>} />
      <Route path="/team" element={<Teams/>} />
      <Route path="/team/:id" element={<TeamDetails/>}/>
      <Route path="/task/:id" element={<TaskDetails/>}/>
    </Routes>
    </BrowserRouter>
    </GlobalStateProvider>
    </PersistGate>
    </Provider>
    <ToastContainer/>
    </>
  );
}

export default App;
