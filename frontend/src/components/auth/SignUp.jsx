import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Link } from 'react-router-dom'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'

const SignUp = () => {

  const [loading, setLoading] = useState(false);

  const [inputData, setInputData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null
  });

  const {user} = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInputData({ ...inputData, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const res = await axios.post("https://career-path-hqsu.onrender.com/api/v1/user/register", inputData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/login")
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() =>{
      if(user){
        navigate("/")
      }
    })

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
          <div className='my-2 '>
            <Label className="mb-1">Full Name</Label>
            <Input
              type="text"
              placeholder="Vinay Rajput"
              onChange={changeHandler}
              name="fullname"
              value={inputData.fullname}
            />
          </div>
          <div className='my-2'>
            <Label className="mb-1">Email</Label>
            <Input
              type="email"
              placeholder="vinay@gmail.com"
              onChange={changeHandler}
              name="email"
              value={inputData.email}
            />
          </div>
          <div className='my-2'>
            <Label className="mb-1">Phone Number</Label>
            <Input
              type="text"
              placeholder="8080808080"
              onChange={changeHandler}
              name="phoneNumber"
              value={inputData.phoneNumber}
            />
          </div>
          <div className='my-2'>
            <Label className="mb-1">Password</Label>
            <Input
              type="password"
              placeholder="123456"
              onChange={changeHandler}
              name="password"
              value={inputData.password}
            />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={inputData.role === "student"}
                  onChange={changeHandler}
                  className="cursor-pointer"
                >
                </Input>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={inputData.role === "recruiter"}
                  onChange={changeHandler}
                  className="cursor-pointer"
                >
                </Input>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            {/* Profile */}
            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input
                type="file"        //use this "file" same as in backend multer.js
                accept="image/*"
                placeholder="Upload Profile"
                className="cursor-pointer"
                onChange={changeFileHandler}
              // name="file"
              // value={inputData.file}
              ></Input>
            </div>
          </div>

          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>

         
          {
            loading ?
            (<Button><Loader2 className='mr-2 h-4 w-4 animate-spin'>Please Wait</Loader2></Button>)
            :
            ( <Button type="submit" className="w-full my-4 bg-black text-white cursor-pointer"
              >SignUp</Button>)
          }
        </form>
      </div>
    </div>
  )
}

export default SignUp
