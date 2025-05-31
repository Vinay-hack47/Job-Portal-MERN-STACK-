import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({job}) => {
  const navigate= useNavigate();
  return (
    <div 
    onClick={() => navigate(`/description/${job?._id}`)}
     className='p-4 shadow-xl bg-white border border-gray-100 cursor-pointer rounded-md mt-5 mx-15'>
      <div>
        <h1>{job?.company?.name}</h1>
        <p>{job?.location}</p>
      </div>

      <div>
        <h1>{job?.title}</h1>
        <p>{job?.description}</p>
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">12 Positions</Badge>
        <Badge className={'text-red-700 font-bold'} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-purple-700 font-bold'} variant="ghost">{job?.salary}LPA</Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
