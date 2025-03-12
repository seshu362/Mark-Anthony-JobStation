import "./index.css";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const UserJobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [duration, setDuration] = useState(6); // Default duration
  const navigate = useNavigate();

  // Memoize fetchJobDetails using useCallback
  const fetchJobDetails = useCallback(async () => {
    try {
      const response = await fetch(`https://markanthony-backend-jobstation.onrender.com/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the request
        },
      });
      const data = await response.json();
      setJob(data);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  }, [id]); // Add id as a dependency for fetchJobDetails

  // Check if the user is authenticated and fetch job details
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token is found, redirect to the login page
      navigate("/login");
    } else {
      // Fetch job details if the user is authenticated
      fetchJobDetails();
    }
  }, [navigate, fetchJobDetails]); // Add fetchJobDetails to the dependency array

  // Set random duration
  useEffect(() => {
    setDuration(Math.floor(Math.random() * (25 - 5 + 1)) + 5); // Random number between 5 and 25
  }, [id]);

  const getRelativeTime = (createdAt) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffInSeconds = Math.floor((now - createdDate) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hr ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  // Dashboard navigation function
  const handleDashboardClick = () => {
    navigate("/userdashboard");
  };

  // Logout function
  const handleLogout = () => {
    // Clear any user-related data (e.g., token from localStorage)
    localStorage.removeItem("token");
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div className="details-jobs-page">
      {/* Header */}
      <nav className="details-job-navbar">
        <div className="details-job-navbar-brand">JobStation</div>
        <div className="user-dashboard-home-navbar-buttons">
                  {/* Dashboard Button */}
                  <button className="user-dashboard-home-dashboard-button" onClick={handleDashboardClick}>
                    Dashboard
                  </button>
        
                  {/* Logout Button */}
                  <button className="user-dashboard-home-logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                  {/* Profile Icon */}
                  <FaUserCircle className="user-dashboard-home-profile-icon" size={24} />
                </div>
      </nav>

      {/* Banner */}
      <div className="details-jobs-banner">
        {job.jobPosition} {job.remote} job/internship at {job.companyName}
      </div>

      {/* Job Details */}
      <div className="details-jobs-details">
        <p className="details-jobs-meta-text">
          {getRelativeTime(job.createdAt)} • {job.jobType}
        </p>
        <h1 className="details-jobs-title">{job.jobPosition}</h1>
        <p className="details-jobs-location">{job.location} | India</p>

        <div className="details-jobs-meta">
          <span>💰 Stipend: ₹ {job.monthlySalary}/month</span>
          <span>📅 Duration: {duration} Months</span>
        </div>

        {/* About Company */}
        <section className="details-jobs-about">
          <h2>About company</h2>
          <p className="margin details-jobs-meta-text">{job.aboutCompany}</p>
        </section>

        {/* About the Job */}
        <section className="details-jobs-responsibilities">
          <h2>About the job/internship</h2>
          <p className="margin details-jobs-meta-text">{job.jobDescription}</p>
        </section>

        {/* Skills Required */}
        <section className="details-jobs-skills">
          <h2 className="margin">Skills Required</h2>
          {job.skillsRequired &&
            job.skillsRequired.split(", ").map((skill, index) => (
              <div key={index} className="details-jobs-skill-badge">
                {skill}
              </div>
            ))}
        </section>

        {/* Additional Information */}
        <section className="details-jobs-additional-info">
          <h2>Additional Information</h2>
          <p className="details-jobs-meta-text">{job.additionalInfo}</p>
        </section>
      </div>
    </div>
  );
};

export default UserJobDetailsPage;