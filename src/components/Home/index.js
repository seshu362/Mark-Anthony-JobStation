import React, { useState, useEffect } from "react";
import { MdPeopleAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("https://markanthony-backend-jobstation.onrender.com/jobs");
      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, selectedSkills); // Instant filtering for search
  };

  const handleSkillChange = (e) => {
    const skill = e.target.value;
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]); // Store skill but don't filter yet
    }
  };

  const removeSkill = (skill) => {
    const updatedSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(updatedSkills);
  };

  const applyFilters = (query, skills) => {
    let filtered = jobs;

    // Apply search filter immediately
    if (query) {
      filtered = filtered.filter(
        (job) =>
          job.jobPosition.toLowerCase().includes(query) ||
          job.skillsRequired.toLowerCase().includes(query)
      );
    }

    // Apply skill filters only when "Apply Filter" is clicked
    if (skills.length > 0) {
      filtered = filtered.filter((job) =>
        skills.every((skill) => job.skillsRequired.includes(skill))
      );
    }

    setFilteredJobs(filtered);
  };

  const handleApplyFilter = () => {
    applyFilters(searchQuery, selectedSkills); // Apply skill filter only when clicking "Apply Filter"
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSkills([]);
    setFilteredJobs(jobs);
  };

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

  // Navigation functions for login and register buttons
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  return (
    <div className="home-initial-page">
      <nav className="home-navbar">
        <div className="home-navbar-brand">JobStation</div>
        <div className="home-navbar-buttons">
          <button className="home-login-button" onClick={handleLoginClick}>Login</button>
          <button className="home-register-button" onClick={handleRegisterClick}>Register</button>
        </div>
      </nav>

      <div className="home-job-filter-container">
        <input
          type="text"
          placeholder="Type any job title"
          className="home-job-filter-input"
          value={searchQuery}
          onChange={handleSearch}
        />

        <div className="home-skills-container">
          <div className="home-skills-dropdown-wrapper">
            <select onChange={handleSkillChange} className="home-skills-dropdown-select" value="">
              <option value="" disabled>Skills</option>
              {skillsList.map((skill, index) => (
                <option key={index} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div className="home-skill-badges">
            {selectedSkills.map((skill) => (
              <span key={skill} className="home-skill-badge">
                {skill} 
                <button className="home-remove-icon" onClick={() => removeSkill(skill)}>x</button>
              </span>
            ))}
          </div>
        </div>

        <div className="home-buttons-container">
          <button className="home-clear-button" onClick={clearFilters}>Clear</button>
          <button className="home-apply-button" onClick={handleApplyFilter}>Apply Filter</button>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="home-no-jobs-message">No Such Job Is Found....</div>
      ) : (
        <div className="home-job-list">
          {filteredJobs.map((job, index) => (
            <div key={index} className="home-job-card">
              <div className="home-left-border"></div>
              <img
                src={job.companyLogoUrl}
                alt="Company Logo"
                className="home-company-logo"
              />
              <div className="home-job-details">
                <div>
                  <h3 className="home-job-title">{job.jobPosition}</h3>
                  <div className="home-job-meta">
                    <span className="home-company-size">
                      <MdPeopleAlt size={18} className="home-people-icon" /> 11-50
                    </span>
                    <span className="home-salary">₹ {job.monthlySalary}</span>
                    <span className="home-location">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                        alt="India Flag"
                        className="home-flag"
                      /> {job.location}
                    </span>
                  </div>
                  <div className="home-job-type">
                    <span>{job.remote}</span>
                    <span>{job.jobType}</span>
                  </div>
                </div>

                <div className="home-job-extra">
                  <div className="home-skills">
                    {(Array.isArray(job.skillsRequired) ? job.skillsRequired : job.skillsRequired?.split(",") || []).map((skill) => (
                      <span key={skill} className="home-skill-tag">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>

                  <button className="home-view-details" onClick={() => navigate(`/job/${job.id}`)}>View details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
