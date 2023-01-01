import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./Pages/login";
import Home from "./Pages/home/home";
import Post from "./Pages/home/post";
import PostCreator from "./Pages/home/postCreator";
import PostEditor from "./Pages/home/postEditor";
import Profile from "./Pages/profile/profile";
import ProfileEdit from "./Pages/profile/profileEdit";

import LoadingOverlay from 'react-loading-overlay'
import SyncLoader from 'react-spinners/SyncLoader'
import { Toaster } from "react-hot-toast";
import { useSelector} from "react-redux";
import { RequireAuth } from "./Utils/requireAuth";


const App = () => {
  const spinnerState= useSelector((state)=>state.spinner)
  return (
    <div>
      {/* ----------------Notification Begins------------- */}
      <LoadingOverlay
        active={spinnerState}
        spinner={<SyncLoader color={'#0E4E48'}/>}
        styles={{
          overlay: (base) => ({
            ...base,
            position: 'fixed'
            })
          }}
       >

      <div>
        <Toaster
          toastOptions={{
            success: {
              duration: 5000,
              position: "top-center",
              style: { background: "#0E4E48", color: "white" },
            },
            error: {
              duration: 5000,
              position: "top-center",
              style: { background: "red", color: "white" },
            },
          }}
          containerStyle={{ top: 50 }}
        />
      </div>
      {/* ----------------Notification Ends------------- */}
      {/* -----------Routes Begins--------------- */}
      <Routes>
        <Route path="/home" element={<RequireAuth loginPath="/"><Home /></RequireAuth> }>
          <Route index element={<Navigate to="/home/post" />} />
          <Route path="/home/post" element={<RequireAuth loginPath="/"><Post /></RequireAuth>} />
        </Route>
        <Route path="create-post" element={<RequireAuth loginPath="/"><PostCreator /></RequireAuth>} />
        <Route path="edit-post" element={<RequireAuth loginPath="/"><PostEditor /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth loginPath="/"><Profile /></RequireAuth>} />
        <Route path="/profile/edit" element={<RequireAuth loginPath="/"><ProfileEdit /></RequireAuth>} />
        
        <Route path="/" element={<Login />} />
      </Routes>
      {/* -----------Routes Ends--------------- */}
      </LoadingOverlay>
    </div>
  );
};

export default App;
