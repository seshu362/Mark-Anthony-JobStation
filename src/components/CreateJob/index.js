import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const CreateJob = () => {
  const navigate = useNavigate();

  // Redirect to login if no token is found
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // State for form fields
  const [companyName, setCompanyName] = useState("");
  const [companyLogoUrl, setCompanyLogoUrl] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [jobType, setJobType] = useState("Select");
  const [remote, setRemote] = useState("Select");
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [skills, setSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Add a new skill
  const handleAddSkill = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault(); // Prevent form submission when pressing Enter
      setSkills([...skills, inputValue.trim()]);
      setInputValue("");
    }
  };

  // Remove a skill
  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the job data
    const jobData = {
      companyName,
      companyLogoUrl,
      jobPosition,
      monthlySalary: parseInt(monthlySalary),
      jobType,
      remote,
      location,
      jobDescription,
      aboutCompany,
      skillsRequired: skills.join(", "),
      additionalInfo,
    };

    try {
      // Send a POST request to the backend
      const response = await fetch("https://markanthony-backend-jobstation.onrender.com/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the JWT token
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error("Failed to create job");
      }

      // Redirect to the dashboard or job listings page
      navigate("/userdashboard");
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="title">Add job description</h2>
        <form onSubmit={handleSubmit}>
          <label>Company Name</label>
          <input
            type="text"
            placeholder="Enter your company name here"
            className="full-width"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />

          <label>Add logo URL</label>
          <input
            type="text"
            placeholder="Enter the link"
            className="full-width"
            value={companyLogoUrl}
            onChange={(e) => setCompanyLogoUrl(e.target.value)}
          />

          <label>Job position</label>
          <input
            type="text"
            placeholder="Enter job position"
            className="full-width"
            value={jobPosition}
            onChange={(e) => setJobPosition(e.target.value)}
            required
          />

          <label>Monthly salary</label>
          <input
            type="text"
            placeholder="Enter Amount in rupees"
            className="full-width"
            value={monthlySalary}
            onChange={(e) => setMonthlySalary(e.target.value)}
            required
          />

          <div className="dropdown-container">
            <div>
              <label>Job Type</label>
              <select
                className="full-width"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                required
              >
                <option value="Select" disabled>
                  Select
                </option>
                <option value="Internship">Internship</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contractual">Contractual</option>
              </select>
            </div>

            <div>
              <label>Remote/In-Office</label>
              <select
                className="full-width"
                value={remote}
                onChange={(e) => setRemote(e.target.value)}
                required
              >
                <option value="Select" disabled>
                  Select
                </option>
                <option value="Remote">Remote</option>
                <option value="In-Office">In-Office</option>
              </select>
            </div>
          </div>

          <label>Location</label>
          <input
            type="text"
            placeholder="Enter Location"
            className="full-width"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <label>Job Description</label>
          <textarea
            placeholder="Type the job description"
            className="full-width"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          ></textarea>

          <label>About Company</label>
          <textarea
            placeholder="Type about your company"
            className="full-width"
            value={aboutCompany}
            onChange={(e) => setAboutCompany(e.target.value)}
            required
          ></textarea>

          <label>Skills Required</label>
          <div className="skills-container full-width">
            {skills.map((skill, index) => (
              <div key={index} className="skill">
                {skill} <span onClick={() => handleRemoveSkill(index)}>✖</span>
              </div>
            ))}
            <input
              type="text"
              placeholder="Enter the must-have skills"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleAddSkill}
            />
          </div>

          <label>Information</label>
          <input
            type="text"
            placeholder="Enter the additional information"
            className="full-width"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />

          <div className="button-group">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/userdashboard")}
            >
              Cancel
            </button>
            <button type="submit" className="add-btn">
              + Add Job
            </button>
          </div>
        </form>
      </div>
      <div className="image-container">
        <img
          src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1741723368/Screenshot_2025-03-12_013223_nsh3ai.png"
          alt="Job Details"
        />
      </div>
    </div>
  );
};

export default CreateJob;
