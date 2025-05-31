import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterJobByText } from '@/redux/jobSlice'

// const jobArray = [1, 2, 3,]

const Browse = () => {

  const dispatch  = useDispatch();
  const { allJobs, filterJobByText } = useSelector((store) => store.job);
  
  const [filterJob, setFilterJob] = useState(allJobs);  

  useEffect(() => {
    const filteredJob = allJobs.length > 0 &&  allJobs.filter((job) => {
      if(!filterJobByText){
        return true;
      }
      return job?.title?.toLowerCase().includes(filterJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(filterJobByText.toLowerCase())
    });
    setFilterJob(filteredJob);

  }, [allJobs, filterJobByText, ])

  // useEffect(()=>{
  //   return()=>{
  //     dispatch(setFilterJobByText('')); 
  //   }
  // }, [])


  return (
    <div className='max-w-7xl mx-auto mt-5'>
      <Navbar></Navbar>

      <div>
        <h1 className='font-bold text-xl'>Search  Result ({filterJob.length})</h1>

        <div className='grid grid-cols-3 gap-3 mt-5'>

          {
            filterJob.length >0  ? (
              filterJob.map((item, index) => (
              <Job job={item}></Job>
            ))
            ) :
             (<div className='flex items-center justify-center col-span-3 min-h-[300px]'>
              <h1 className=' text-2xl font-bold text-black'>No Jobs Found!</h1>
             </div>) 
          }
        </div>
      </div>
    </div>
  )
}

export default Browse
