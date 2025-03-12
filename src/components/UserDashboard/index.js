import React, { useState, useEffect } from "react";
import { MdPeopleAlt } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import
import "./index.css";

const UserDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null); // Add this state
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token is found, redirect to the login page
      navigate("/login");
    } else {
      // Decode the token to get the user ID
      const decodedToken = jwtDecode(token); // Use jwtDecode here
      setCurrentUserId(decodedToken.id); // Set the current user ID
      fetchJobs();
    }
  }, [navigate]);

  // Fetch jobs from the backend
  const fetchJobs = async () => {
    try {
      const response = await fetch("https://markanthony-backend-jobstation.onrender.com/jobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, selectedSkills); // Instant filtering for search
  };

  // Handle skill selection
  const handleSkillChange = (e) => {
    const skill = e.target.value;
    if (skill && !selectedSkills.includes(skill)) {
      const updatedSkills = [...selectedSkills, skill];
      setSelectedSkills(updatedSkills);
      applyFilters(searchQuery, updatedSkills); // Apply filters immediately when a skill is selected
    }
  };

  // Remove a selected skill
  const removeSkill = (skill) => {
    const updatedSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(updatedSkills);
    applyFilters(searchQuery, updatedSkills); // Reapply filters when a skill is removed
  };

  // Apply search and skill filters
  const applyFilters = (query, skills) => {
    let filtered = jobs;

    // Apply search filter
    if (query) {
      filtered = filtered.filter(
        (job) =>
          job.jobPosition.toLowerCase().includes(query) ||
          job.skillsRequired.toLowerCase().includes(query)
      );
    }

    // Apply skill filters
    if (skills.length > 0) {
      filtered = filtered.filter((job) =>
        skills.every((skill) => job.skillsRequired.includes(skill))
      );
    }

    setFilteredJobs(filtered);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSkills([]);
    setFilteredJobs(jobs);
  };

  // Skills list for the dropdown
  const skillsList = [
    "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Node.js", "Express", "REST APIs", "GraphQL",
    "HTML5", "CSS3", "SASS", "Bootstrap", "Tailwind CSS", "Material UI", "Figma", "Adobe XD", "User Research", "Prototyping",
    "Python", "Java", "C#", "Go", "Ruby", "Django", "Spring Boot", "Flask", "FastAPI", "ASP.NET",
    "SQL", "PostgreSQL", "MongoDB", "MySQL", "SQLite", "Firebase", "Redis", "NoSQL", "ORM (Sequelize, Prisma, TypeORM)",
    "Docker", "Kubernetes", "AWS", "Google Cloud", "Azure", "Terraform", "CI/CD", "Jenkins", "GitHub Actions", "Ansible",
    "SEO", "SEM", "Social Media Marketing", "Google Analytics", "Content Creation",
    "Testing (Jest, Mocha, Cypress)", "Version Control (Git, GitHub, GitLab, Bitbucket)",
    "Microservices Architecture", "Web Security", "Performance Optimization"
  ];

  // Dashboard navigation function
  const handleDashboardClick = () => {
    navigate("/userdashboard");
  };

   // SavedJobs navigation function
   const handleSavedJobdClick = () => {
    navigate("/bookmarks");
  };

  // Logout function
  const handleLogout = () => {
    // Clear any user-related data (e.g., token from localStorage)
    localStorage.removeItem("token");
    // Navigate to the login page
    navigate("/login");
  };

  // Navigate to the Add Job page
  const handleAddJobClick = () => {
    navigate("/jobs/new");
  };

  // Navigate to the Edit Job page
  const handleEditJobClick = (jobId) => {
    navigate(`/jobs/${jobId}/edit`);
  };

  const handleDeleteJobClick = async (jobId) => {
    try {
      const response = await fetch(`https://markanthony-backend-jobstation.onrender.com/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const updatedJobs = jobs.filter((job) => job.id !== jobId);
        setJobs(updatedJobs);
        setFilteredJobs(updatedJobs);
        alert("Job deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to delete job: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("An error occurred while deleting the job.");
    }
  };

  // Navigate to the Job Details page
  const handleViewDetailsClick = (jobId) => {
    navigate(`/userjobdetails/${jobId}`); // Navigate to the UserJobDetails page
  };

  // Render the Edit Job button only if the current user is the job owner
  const renderEditButton = (job) => {
    if (job.userId === currentUserId) {
      return (
        <button
          className="home-register-button"
          onClick={() => handleEditJobClick(job.id)}
        >
          Edit Job
        </button>
      );
    }
    return null;
  };

  // Render the Delete Job button only if the current user is the job owner
  const renderDeleteButton = (job) => {
    if (job.userId === currentUserId) {
      return (
        <button
          className="home-register-button"
          onClick={() => handleDeleteJobClick(job.id)}
        >
          Delete Job
        </button>
      );
    }
    return null;
  };

  return (
    <div className="user-dashboard-home-initial-page">
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

      <div className="user-dashboard-home-job-filter-container">
        <input
          type="text"
          placeholder="Type any job title"
          className="user-dashboard-home-job-filter-input"
          value={searchQuery}
          onChange={handleSearch}
        />

        <div className="user-dashboard-home-skills-container">
          <div className="user-dashboard-home-skills-dropdown-wrapper">
            <select onChange={handleSkillChange} className="user-dashboard-home-skills-dropdown-select" value="">
              <option value="" disabled>Skills</option>
              {skillsList.map((skill, index) => (
                <option key={index} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div className="user-dashboard-home-skill-badges">
            {selectedSkills.map((skill) => (
              <span key={skill} className="user-dashboard-home-skill-badge">
                {skill}
                <button className="user-dashboard-home-remove-icon" onClick={() => removeSkill(skill)}>x</button>
              </span>
            ))}
          </div>
        </div>

        <div className="user-dashboard-home-buttons-container">
          <button className="user-dashboard-home-clear-button" onClick={clearFilters}>Clear</button>
          <button className="user-dashboard-home-apply-button" onClick={handleAddJobClick}>
            + Add Job
          </button>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="user-dashboard-home-no-jobs-message">No Such Job Is Found....</div>
      ) : (
        <div className="user-dashboard-home-job-list">
          {filteredJobs.map((job, index) => (
            <div key={index} className="user-dashboard-home-job-card">
              <div className="user-dashboard-home-left-border"></div>
              <img
                src={job.companyLogoUrl}
                alt="Company Logo"
                className="user-dashboard-home-company-logo"
              />
              <div className="user-dashboard-home-job-details">
                <div>
                  <h3 className="user-dashboard-home-job-title">{job.jobPosition}</h3>
                  <div className="user-dashboard-home-job-meta">
                    <span className="user-dashboard-home-company-size">
                      <MdPeopleAlt size={18} className="user-dashboard-home-people-icon" /> 11-50
                    </span>
                    <span className="user-dashboard-home-salary">₹ {job.monthlySalary}</span>
                    <span className="user-dashboard-home-location">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                        alt="India Flag"
                        className="user-dashboard-home-flag"
                      /> {job.location}
                    </span>
                  </div>
                  <div className="user-dashboard-home-job-type">
                    <span>{job.remote}</span>
                    <span>{job.jobType}</span>
                  </div>
                </div>

                <div className="user-dashboard-home-job-extra">
                  <div className="user-dashboard-home-skills">
                    {(
                      Array.isArray(job.skillsRequired)
                        ? job.skillsRequired
                        : job.skillsRequired?.split(",") || []
                    ).map((skill) => (
                      <span key={skill} className="user-dashboard-home-skill-tag">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="user-dashboard-home-action-buttons">
                    {renderEditButton(job)}
                    {renderDeleteButton(job)}
                    <button
                      className="home-login-button"
                      onClick={() => handleViewDetailsClick(job.id)}
                    >
                      View details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;