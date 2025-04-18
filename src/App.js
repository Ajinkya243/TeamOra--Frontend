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
function App() {
  return (
    <>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    </PersistGate>
    </Provider>
    <ToastContainer/>
    </>
  );
}

export default App;
