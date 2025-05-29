import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const JobSetup = () => {

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: [],
    salary: "",
    experience: "",
    jobType: "",
    location: "",
    position: "",
  });
  const [loading, setLoading] = useState(false);

  const paramas = useParams();
  const jobId = paramas.id;

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(`http://localhost:3000/api/v1/job/post/${jobId}`, input,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      console.log("res", res.data);
      
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/admin/jobs")
        setInput({
          title: "",
          description: "",
          requirements: [],
          salary: "",
          experience: "",
          jobType: "",
          location: "",
          position: "",
        })
      }
      
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message)
    }finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar></Navbar>

      <div className='max-w-xl mx-auto my-5 p-5'>
        <div className='border p-5 rounded-lg bg-white shadow-md border-gray-200 '>
          <form onSubmit={submitHandler}>
            <div className='grid grid-cols-2 gap-4 mb-5'>
              <div className='w-fit'>
                <Label className="font-bold mb-1 ">Title</Label>
                <Input type="text" name="title" value={input.title} onChange={changeHandler}></Input>
              </div>
              <div className='w-fit'>
                <Label className="font-bold mb-1 ">Description</Label>
                <Input type="text" name="description" value={input.description} onChange={changeHandler}></Input>
              </div>
              <div className='w-fit'>
                <Label className="font-bold mb-1 ">Requirements</Label>
                <Input type="text" name="requirements" value={input.requirements} onChange={changeHandler}></Input>
              </div>
              <div className='w-fit'>
                <Label className="font-bold mb-1 ">Salary</Label>
                <Input type="text" name="salary" value={input.salary} onChange={changeHandler}></Input>
              </div>
              <div className='w-fit'>
                <Label className="font-bold mb-1 ">Experience</Label>
                <Input type="text" name="experience" value={input.experience} onChange={changeHandler}></Input>
              </div>
              <div className='w-fit'>
                <Label className="font-bold mb-1 ">Job Type</Label>
                <Input type="text" name="jobType" value={input.jobType} onChange={changeHandler}></Input>
              </div>
              <div className='w-fit'>
                <Label className="font-bold mb-1">Location</Label>
                <Input type="text" name="location" value={input.location} onChange={changeHandler}></Input>
              </div>
              <div className='w-fit'>
                <Label className="font-bold mb-1 ">No. of Position</Label>
                <Input type="number" name="position" value={input.position} onChange={changeHandler}></Input>
              </div>

            </div>
            <Button type="submit" variant="outline" className="bg-blue-700 text-white cursor-pointer mt-5 justify-center w-full">
              {loading && <Loader2 className="animate-spin mr-2" size={20}  />}
              Post Job</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default JobSetup
