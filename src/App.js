import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import JobDetails from "./components/JobDetails";
import './App.css';
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserDashboard from "./components/UserDashboard"; 
import UserJobDetailsPage from "./components/UserJobDetailsPage";  
import CreateJob from "./components/CreateJob"; 
import EditingJob from "./components/EditingJob";
import UserJobDetails from "./components/UserJobDetails";
import BookMarkList from "./components/BookMarkList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/job/:id" element={<JobDetails />} />
      <Route path="/userjobdetails/:id" element={<UserJobDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/userjob/:id" element={<UserJobDetailsPage />} />
      <Route path="/jobs/new" element={<CreateJob />} />
      <Route path="/jobs/:id/edit" element={<EditingJob />} />
      <Route path="/bookmarks" element={<BookMarkList />} />
    </Routes>
  );
};

export default App;
