import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Mail, Pen, Phone } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfile from './UpdateProfile'
import { useSelector } from 'react-redux'
import useGetAllAppliedJobs from '@/hooks/useGetAllAppliedJobs'

// const skills = ["HTML", "CSS", "JavaScript", "React"]

const Profile = () => {
  useGetAllAppliedJobs();

  const [open, setOpen] = useState("");
  const { user } = useSelector((store) => store.auth);

  const skillArray = user?.profile?.skills || [];

  const isResume = true;
  return <>
    <div>
      <Navbar></Navbar>

      <div className='max-w-4xl mx-auto gap-5 mt-8 border rounded border-gray-300 p-5 shadow-lg bg-white'>
        <div className='flex  gap-5'>
          <Avatar className="w-22 h-22  ">
            <AvatarImage src={user?.profile?.profilePhoto ? (user?.profile?.profilePhoto) : ("https://github.com/shadcn.png")}  alt="Profile Picture" className=" rounded-full border-2 border-gray-300 shadow-lg" />
          </Avatar>

          <div className='flex justify-between w-full'>
            <div >
              <h1 className='font-bold'>{user?.fullname}</h1>
              <p className='text-gray-500'>{(user?.profile?.bio) ? (user?.profile?.bio):("Bio not added")}</p>
            </div>
            <Button onClick={() => setOpen(true)} className="cursor-pointer" variant="outline"><Pen></Pen></Button>
          </div>
        </div>

        <div>
          <div className='flex gap-5 mt-5 items-center'>
            <Mail size={20}></Mail>
            <p>{user?.email}</p>

          </div>
          <div className='flex gap-5 mt-2 items-center'>
            <Phone size={20}></Phone>
            <p>{user?.phoneNumber}</p>
          </div>
        </div>

        <div className='mt-5'>
          <h1 className='m'>Skills</h1>

          <div className='flex gap-2 mt-2'>
            {
              skillArray.length !== 0 ? (skillArray.map((skill, index) => <Badge className="bg-black text-white rounded-full">{skill}</Badge>)) : <p className='text-gray-500'>No skills added</p>
            }
          </div>
        </div>

        <div className='grid  w-full max-w-sm items-center gap-1.5 mt-5'>
          <Label>Resume</Label>
          {
            isResume ? <a className='text-blue-600 hover:underline' target='blank' href={user?.profile?.resume}>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
          }
        </div>
      </div>

      <div className='max-w-4xl mx-auto mt-8 rounded-2xl'>
        <h1>Applied Jobs</h1>

        {/* Applied Job Table */}
        <AppliedJobTable></AppliedJobTable>
      </div>

      <UpdateProfile open={open} setOpen={setOpen}></UpdateProfile>
    </div>
  </>
}

export default Profile
