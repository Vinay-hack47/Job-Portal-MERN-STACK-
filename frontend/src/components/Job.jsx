import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  console.log(job);


  // const jobId = "1234567890";

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate - createdAt);
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  }

  const navigate = useNavigate();
  return (
    <div>
      {
        job ?
          (<div className='border border-gray-300 bg-white rounded-md p-5 shadow-xl hover:shadow-lg transition duration-300 ease-in-out'>
            <div className='flex gap-2 justify-between items-center'>
              <p className='text-sm text-gray-600'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : daysAgoFunction(job?.createdAt) + " days ago"}</p>
              <Button variant="ghost" className="rounded-full cursor-pointer" size="icon"><Bookmark ></Bookmark></Button>
            </div>

            <div className='flex gap-2 mt-1'>
              <Button> <Avatar>
                <AvatarImage src={job?.company?.logo} alt="Company Logo" className="w-8 h-8" /></Avatar>
              </Button>

              <div>
                <h1 className='font-medium'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-600'>{job?.location}</p>
              </div>
            </div>

            <div>
              <h1 className=' font-semibold mt-2 ml-2'>{job?.title}</h1>
              <p className='text-gray-500'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
              <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
              <Badge className={'text-red-700 font-bold'} variant="ghost">{job?.jobType}</Badge>
              <Badge className={'text-purple-700 font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>

            <div className='mt-4 flex justify-between items-center'>
              <Button onClick={() => navigate(`/description/${job?._id}`)} className="cursor-pointer" variant="outline">Details</Button>
              <Button variant="outline" className="bg-[#1447e6] text-white cursor-pointer">Save For Later</Button>
            </div>

          </div>)
          :
          (<span className='text-xl font-bold mx-auto my-auto text-black'>No Jobs Found!</span>)

      }
    </div>
  )
}

export default Job
