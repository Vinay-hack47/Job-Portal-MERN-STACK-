import React from 'react'
import LatestJobCards from './LatestJobCards'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LatestJobs = () => {


  // const cardsArray = [1, 2, 3, 4, 5, 6, 7, 8]
  useGetAllJobs();
  const navigate = useNavigate();

  const {allJobs} = useSelector((store) => store.job);
  return <>
    <div className='text-4xl font-bold mx-15  my-3'>
      <h1><span className='text-[#1447e6]'>Latest & Top </span> Job Openings</h1>
    </div>

    <div className='grid grid-cols-3 gap-4 my-5'>

      {
        allJobs.slice(0, 6).map((job, index) =>
          <LatestJobCards job = {job}></LatestJobCards>
        )}
    </div>
  </>
}

export default LatestJobs
