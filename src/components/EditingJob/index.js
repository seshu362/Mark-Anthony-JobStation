import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import "./index.css";

const EditingJob = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Use `id` instead of `jobId`

  // Debug: Log the jobId
  console.log("Job ID from URL:", id);

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
  const [error, setError] = useState("");

  // Fetch the job data when the component loads
  useEffect(() => {
    if (!id) {
      setError("Job ID is missing from the URL.");
      return;
    }

    const token = localStorage.getItem("token");


    if (!token) {
      navigate("/login");
      return;
    }

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken); // Log the decoded token

    const fetchJob = async () => {
      try {
        const response = await fetch(`https://markanthony-backend-jobstation.onrender.com/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response Status:", response.status); // Log the response status

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const job = await response.json();
        console.log("Fetched Job:", job); // Log the fetched job

        // Populate the form fields with the fetched job data
        setCompanyName(job.companyName);
        setCompanyLogoUrl(job.companyLogoUrl);
        setJobPosition(job.jobPosition);
        setMonthlySalary(job.monthlySalary);
        setJobType(job.jobType);
        setRemote(job.remote);
        setLocation(job.location);
        setJobDescription(job.jobDescription);
        setAboutCompany(job.aboutCompany);
        setSkills(
          typeof job.skillsRequired === "string"
            ? job.skillsRequired.split(",").map((skill) => skill.trim())
            : []
        );
        setAdditionalInfo(job.additionalInfo);
      } catch (error) {
        console.error("Error fetching job:", error);
        setError("Failed to load job details. Please check your network connection.");
      }
    };

    fetchJob();
  }, [id, navigate]);

  // Add a new skill
  const handleAddSkill = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
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
      // Send a PUT request to update the job
      const response = await fetch(`https://markanthony-backend-jobstation.onrender.com/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      // Redirect to the dashboard after successful update
      navigate("/userdashboard");
    } catch (error) {
      console.error("Error updating job:", error);
      setError("Failed to update job. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="title">Edit job description</h2>
        {error && <p className="error-message">{error}</p>}
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
                <option value="Select" disabled>Select</option>
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
                <option value="Select" disabled>Select</option>
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
              Update Job
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

export default EditingJob;