# CareerPath – MERN Job Portal

[Live Demo](https://career-path-hqsu.onrender.com)

CareerPath is a full-stack job portal web application designed to connect job seekers and recruiters. Built with the MERN stack, it features secure authentication, company and job management, applicant tracking, and a modern, responsive UI.

---

## 🚀 Features

- **User Authentication & Authorization**: JWT-based authentication for students (job seekers) and recruiters (company admins), with protected routes and role-based access.
- **Company Management**: Recruiters can create, update, and manage company profiles, including logo uploads (Cloudinary integration).
- **Job Posting & Management**: Recruiters can post, edit, and manage job listings with detailed information.
- **Job Browsing & Application**: Students can browse/search jobs, view details, and apply directly.
- **Applicant Tracking**: Recruiters can view applicants for their jobs and update application statuses.
- **Profile Management**: Users can update their profiles and upload profile photos.
- **Responsive UI**: Built with React, Tailwind CSS, and Vite for a fast, modern experience.
- **State Management**: Uses Redux Toolkit for scalable state management.
- **RESTful API**: Clean, well-structured backend API with Express.js and MongoDB.
- **File Uploads**: Multer for file uploads, Cloudinary for storage.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Redux Toolkit, React Router, Axios, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Multer, Cloudinary
- **Other:** ESLint, dotenv, cookie-parser

---

## 📦 Project Structure

```
backend/
  controllers/
  db/
  middleware/
  models/
  router/
  utils/
frontend/
  public/
  src/
    admin/
    assets/
    components/
    hooks/
    lib/
    redux/
```

---

## 🌐 API Endpoints

### User
- `POST   /api/v1/user/register` – Register a new user
- `POST   /api/v1/user/login` – Login
- `POST   /api/v1/user/logout` – Logout
- `PUT    /api/v1/user/update/:id` – Update user info
- `PUT    /api/v1/user/profile/update` – Update profile (with image)

### Company
- `POST   /api/v1/company/register` – Register a new company
- `GET    /api/v1/company/get` – Get all companies for the user
- `GET    /api/v1/company/get/:id` – Get company by ID
- `PUT    /api/v1/company/update/:id` – Update company info

### Job
- `POST   /api/v1/job/post/:id` – Post a new job (by company ID)
- `GET    /api/v1/job/get` – Get all jobs
- `GET    /api/v1/job/getadminjobs` – Get jobs created by the admin
- `GET    /api/v1/job/get/:id` – Get job by ID

### Application
- `POST   /api/v1/application/apply/:id` – Apply to a job
- `GET    /api/v1/application/get` – Get all jobs applied by the user
- `GET    /api/v1/application/:id/applicants` – Get applicants for a job
- `PUT    /api/v1/application/status/:id/update` – Update application status
- `GET    /api/v1/application/applicantsById/:id` – Get application by ID

---

## 🖥️ Getting Started

### Prerequisites
- Node.js & npm
- MongoDB Atlas account (or local MongoDB)

### Backend Setup
```bash
cd backend
npm install
# Set up your .env file (see .env.example)
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```


---

## 📣 Live Demo
[https://career-path-hqsu.onrender.com](https://career-path-hqsu.onrender.com)
