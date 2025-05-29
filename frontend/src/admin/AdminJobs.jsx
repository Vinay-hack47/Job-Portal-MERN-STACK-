import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();

  const {allAdminJobs} = useSelector((state) => state.job);

  const jobId = allAdminJobs?.map((job) => job?._id);

  const [input, setInput] = useState("");
  console.log("input", input);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() =>{
      dispatch(setSearchJobByText(input))
  }, [input, dispatch])
  return (
    <div>
      <Navbar></Navbar>

      <div className='max-w-6xl mx-auto my-5 p-5'>
      <div className='flex items-center justify-between '>
        <Input className="w-fit " placeholder="Filter by Name, Role" onChange={(e) => setInput(e.target.value)}></Input>
        <Button variant="outline" className="text-md bg-blue-700 text-white cursor-pointer" onClick={() => navigate(`/admin/jobs/create`)}>New Jobs</Button>
      </div>

      <AdminJobsTable></AdminJobsTable>
      </div>
    </div>
  )
}

export default AdminJobs
