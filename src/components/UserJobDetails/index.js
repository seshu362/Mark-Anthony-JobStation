import "./index.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Loader from 'react-loader-spinner'

const UserJobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  // Check if the user is authenticated and fetch job details
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        // If no token is found, redirect to the login page
        navigate("/login");
      } else {
        
      }
    }, [navigate]); // Add fetchJobDetails to the dependency array

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://markanthony-backend-jobstation.onrender.com/jobs/${id}`);
        const data = await response.json();
        setJob(data);
        setIsBookmarked(data.isBookmarked || false); // Assuming API provides this info
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [id]);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleBookmark = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://markanthony-backend-jobstation.onrender.com/bookmarks", {
        method: "POST", // Only allow adding bookmarks, not removing
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ jobId: id }),
      });

      if (response.ok) {
        setIsBookmarked(true);
        localStorage.setItem(`bookmarked_${id}`, "true"); // Store in localStorage to persist
      } else {
        alert("Failed to save job.");
      }
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  useEffect(() => {
    const storedBookmark = localStorage.getItem(`bookmarked_${id}`);
    if (storedBookmark === "true") {
      setIsBookmarked(true);
    }
  }, [id]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  if (!job) {
    return <div
        className="list-restaurant-loader-bg-container"
        data-testid="restaurant-details-loader"
      >
        <Loader type="ThreeDots" color="#ff5242" height="50" width="50" />
      </div>
  }

// Dashboard navigation function
const handleDashboardClick = () => {
    navigate("/userdashboard");
  };

   // SavedJobs navigation function
   const handleSavedJobdClick = () => {
    navigate("/bookmarks");
  };
  
  return (
    <div className="details-jobs-page">
        <nav className="user-dashboard-home-navbar">
                <div className="user-dashboard-home-navbar-brand">JobStation</div>
                <div className="user-dashboard-home-navbar-buttons">
                  {/* Dashboard Button */}
                  <button className="user-dashboard-home-dashboard-button" onClick={handleDashboardClick}>
                    Dashboard
                  </button>
        
                  {/* SavedJobs Button */}
                  <button className="user-dashboard-home-dashboard-button" onClick={handleSavedJobdClick}>
                    SavedJobs
                  </button>
        
                  {/* Logout Button */}
                  <button className="user-dashboard-home-logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                  {/* Profile Icon */}
                  <FaUserCircle className="user-dashboard-home-profile-icon" size={24} />
                </div>
              </nav>
      

      <div className="details-jobs-banner">
        {job.jobPosition} {job.remote} job/internship at {job.companyName}
      </div>

      <div className="details-jobs-details">
        <p className="details-jobs-meta-text">
          {new Date(job.createdAt).toLocaleDateString()} | {job.jobType}
        </p>
        
        <div className="container-bookbark-jobposition">
          <h1 className="details-jobs-title">{job.jobPosition}</h1>
          {isLoggedIn && (
            <button className="bookmark-button" onClick={handleBookmark}>
              {isBookmarked ? <FaBookmark className="bookmark-icon" /> : <FaRegBookmark className="bookmark-icon" />}
              {isBookmarked ? " Saved" : " Save"}
            </button>
          )}
        </div>

        <p className="details-jobs-location">{job.location} | India</p>

        <div className="details-jobs-meta">
          <span>💰 Stipend: ₹ {job.monthlySalary}/month</span>
        </div>

        <section className="details-jobs-about">
          <h2>About company</h2>
          <p className="margin details-jobs-meta-text">{job.aboutCompany}</p>
        </section>

        <section className="details-jobs-responsibilities">
          <h2>About the job/internship</h2>
          <p className="margin details-jobs-meta-text">{job.jobDescription}</p>
        </section>

        <section className="details-jobs-skills">
          <h2 className="margin">Skills Required</h2>
          {job.skillsRequired?.split(", ").map((skill, index) => (
            <div key={index} className="details-jobs-skill-badge">
              {skill}
            </div>
          ))}
        </section>

        <section className="details-jobs-additional-info">
          <h2>Additional Information</h2>
          <p className="details-jobs-meta-text">{job.additionalInfo}</p>
        </section>
      </div>
    </div>
  );
};

export default UserJobDetails;
