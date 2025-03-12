# JobStation Frontend

The Job Listing Platform is a full-stack web application built using Node.js, Express, React, and a SQLite database database . The platform enables users to register, log in, and manage job listings while implementing secure authentication, role-based access control, and a user-friendly interface.

## Deployment
The frontend is deployed on Netlify: ``` https://seshu-mark-anthony-jobstation.netlify.app/ ```

## Project Structure

```
  /job-station-frontend
  │── /src
  │   ├── /components
  │   │   ├── Home.js
  │   │   ├── JobDetails.js
  │   │   ├── Login.js
  │   │   ├── Signup.js
  │   │   ├── UserDashboard.js
  │   │   ├── UserJobDetails.js
  │   │   ├── UserJobDetailsPage.js
  │   │   ├── CreateJob.js
  │   │   ├── EditingJob.js
  │   │   ├── BookMarkList.js
  │   ├── App.js
  │   ├── index.js
  │   ├── App.css
  │── /public
  │── package.json
  │── README.md

```

## 🚀 Features  

- **User Authentication** (Login & Signup)  
- **View Job Listings** - Browse available job opportunities  
- **View Job Details** - See in-depth details about a specific job  
- **Create, Edit, and Delete Job Postings** (for authenticated users)  
- **User Dashboard** - Manage posted job listings  
- **Bookmark & Save Jobs** - Save jobs for later reference  


## Routes & API Endpoints  

### **Frontend Routes**  

The frontend consists of the following routes:  

#### **Public Routes**  
- `/` → Home page (list of job listings)  
- `/login` → User login page  
- `/signup` → User signup page  
- `/job/:id` → View job details  

#### **Private Routes (Requires Authentication)**  
- `/userdashboard` → User dashboard to manage jobs  
- `/userjobdetails/:id` → View user's job details  
- `/jobs/new` → Create a new job listing  
- `/jobs/:id/edit` → Edit an existing job listing  
- `/bookmarks` → View saved/bookmarked jobs  

---  

### **API Endpoints**  

The frontend interacts with the backend deployed at:  
**JobStation Backend**  

#### **User Authentication**  
- `POST /register` → Register a new user  
- `POST /login` → Authenticate a user  

#### **Job Listings**  
- `GET /jobs` → Retrieve all job listings  
- `GET /jobs/:id` → Retrieve a specific job  
- `POST /jobs` → Create a new job listing  
- `PUT /jobs/:id` → Edit a job listing  
- `DELETE /jobs/:id` → Delete a job listing  

#### **Bookmarks**  
- `POST /bookmarks` → Bookmark a job listing  
- `GET /bookmarks` → Retrieve bookmarked jobs

## Setup Instructions

 ### 2. Install Setup
   1. Navigate to the Frontend  directory:
        ```bash
           cd Frontend 
        ```
  2. Install dependencies::
        ```bash
           npm install
        ```   
  3. Start the Frontend server::
        ```bash
           npm start
        ```     
        The backend will run on http://localhost:3000.

---

## 🖥️ Backend API  

The frontend interacts with the backend deployed at:  
```
  This is the backend for the Job Station application, deployed on Render.
  Backend Deployment Link: https://markanthony-backend-jobstation.onrender.com
```


