import React, { useEffect, useMemo, useState} from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import toast from 'react-hot-toast';

const JobDescription = () => {

  const paramas = useParams();

  //todo There are two ways to get the id from the params. One is using destructuring and another is using the params object.
  // const { id } = paramas;
  const jobId = paramas.id;

  const dispatch = useDispatch();
  const {singleJob} = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  
  // const isApplied = singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
  
  //todo Good way to check if the user has applied for the job or not by using useMemo hook.
  //todo useMemo is used to memoize the value of isApplied so that it doesn't get recalculated on every render.
  //todo It will only recalculate when singleJob or user changes.
  //todo This is a good way to optimize the performance of the component.
  
  const isInitiallyApplied = useMemo(() => {
    if (!singleJob || !user) return false;
    return singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    );
  }, [singleJob, user]);
  
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () =>{
    
    try {
      const res = await axios.post(`https://career-path-hqsu.onrender.com/api/v1/application/apply/${jobId}`,{},{
        withCredentials: true,
      })
      
      if(res.data.success){
        setIsApplied(true);
        const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant: user?._id}]}    //! understand the spread operator and how it works, in this case we are adding the new applicant id to the existing applications array
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(res.data.message)        
      }
    } catch ({error}) {
      toast.error(error?.response?.data?.message) || "Something went wrong"
    }
  }
 

  useEffect(() => {
    const getJobById = async () =>{
      try {
        const res = await axios.get(`https://career-path-hqsu.onrender.com/api/v1/job/get/${jobId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        if(res.data.success){
          dispatch(setSingleJob(res.data.job))
          setIsApplied(res.data.job.applications.some((application) => application.applicant === user?._id))   //! after updating the singleJob we are checking if the user has applied for the job or not
        }
      } catch (error) {
        console.log(error);
      }
    }
    getJobById();
  },[])



  


  return (
    <div className='max-w-7xl mx-auto mt-5 p-4'>
      <h1 className='font-bold text-xl'>{singleJob?.title}</h1>

      <div className='flex items-center gap-2 mt-4  justify-between'>

      <div className='flex items-center gap-2'>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">12 Positions</Badge>
        <Badge className={'text-red-700 font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
        <Badge className={'text-purple-700 font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
      </div>

      {
        isApplied ? (<Button className="cursor-not-allowed bg-gray-600 text-white">Already Applied</Button>) : ( <Button className="bg-[#1447e6] cursor-pointer hover:bg-[#0a047c] text-white" onClick={applyJobHandler}>Apply Now</Button>)
      }

     
      </div>

      <div>
       <h1 className='font-medium border-b-1 mt-5 mb-4'> Job Description</h1>

       <div>
        <h1 className='font-bold'>Role: <span className=' text-gray-600 font-normal ml-3'>{singleJob?.position}</span></h1>
        <h1 className='font-bold'>Location: <span className=' text-gray-600 font-normal ml-3'>{singleJob?.location}</span></h1>
        <h1 className='font-bold'>Description: <span className=' text-gray-600 font-normal ml-3'>{singleJob?.description}</span></h1>
        <h1 className='font-bold'>Experience: <span className=' text-gray-600 font-normal ml-3'>{singleJob?.experienceLevel} years</span></h1>
        <h1 className='font-bold'>Salary: <span className=' text-gray-600 font-normal ml-3'>{singleJob?.salary}LPA</span></h1>
        <h1 className='font-bold'>Total Applicants: <span className=' text-gray-600 font-normal ml-3'>{singleJob?.applications.length}</span></h1>
        <h1 className='font-bold'>Posted Date: <span className=' text-gray-600 font-normal ml-3'>{singleJob?.createdAt?.split("T")?.[0]}</span></h1>
       </div>
      </div>
    </div>
  )
}

export default JobDescription
