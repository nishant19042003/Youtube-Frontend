import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './Store/Store.js';
import { Provider } from 'react-redux';
import LoginForm from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import Signup from './Pages/Signup.jsx';
import Layout from './Componenets/Layout';
import App from './App.jsx';
import VideoUpload from './Pages/VideoUpload.jsx';
import Sidebar from './Componenets/Sidebar.jsx';
import './index.css' 
import ChannelProfile from './Pages/ChannelProfile.jsx';
import VideoPlayerPage from './Pages/VideoPlayerPage.jsx';
import VideoUpdate from './Pages/VideoUpdate.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          
          <Route path='/'element={<Layout />}>
            
            <Route path='home' element={<Home />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<Signup />} />
            <Route path="channel/:id" element={<ChannelProfile />} />
            <Route path="video/:id/:channelId" element={<VideoPlayerPage />} />
            <Route path="upload" element={<VideoUpload />} />
            <Route path="update/:id" element={<VideoUpdate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
