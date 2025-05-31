import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './components/Home'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './admin/Companies'
import CompanyCreate from './admin/CompanyCreate'
import CompanySetup from './admin/CompanySetup'
import AdminJobs from './admin/AdminJobs'
import JobCreate from './admin/JobCreate'
import JobSetup from './admin/JobSetup'
import Applicants from './admin/Applicants'
import ProtectedRoute from './admin/ProtectedRoute'



const App = () => {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home></Home>
    },
    {
      path: '/login',
      element: <Login></Login>
    },
    {
      path: '/register',
      element: <SignUp></SignUp>
    }, {
      path: "/jobs",
      element: <Jobs></Jobs>
    },
    {
      path: '/browse',
      element: <Browse></Browse>
    },
    {
      path: "/profile",
      element: <Profile></Profile>
    },
    {
      path: "/description/:id",
      element: <JobDescription></JobDescription>
    },

    //todo Yaha se admin routes start honge
    {
      path: "/admin/companies",
      element: <ProtectedRoute><Companies></Companies></ProtectedRoute>
    },
    {
      path: "/admin/companies/create",
      element: <ProtectedRoute><CompanyCreate></CompanyCreate></ProtectedRoute>
    },
    {
      path: "/admin/companies/create/:id",
      element: <CompanySetup></CompanySetup>
    },
    {
      path: "/admin/jobs",
      element: <AdminJobs></AdminJobs>
    },
    {
      path: "/admin/jobs/create",
      element: <JobCreate></JobCreate>
    },
    {
      path: "/admin/jobs/create/:id",
      element: <JobSetup></JobSetup>
    },
    {
      path: "/admin/jobs/:id/applicants",
      element: <Applicants></Applicants>
    },
  ])

  return <>
    <RouterProvider router={appRouter} />
  </>
}

export default App
