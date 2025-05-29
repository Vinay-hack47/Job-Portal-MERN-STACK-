import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Link } from 'react-router-dom'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector((store) => store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();


    try {
      dispatch(setLoading(true))
      const res = await axios.post("http://localhost:3000/api/v1/user/login", inputData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })

      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(setUser(res.data.user));
        navigate("/")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
    finally {
      dispatch(setLoading(false))
    }

  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>

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
                  className="cursor-pointer"
                  checked={inputData.role === "student"}
                  onChange={changeHandler}
                >
                </Input>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  checked={inputData.role === "recruiter"}
                  onChange={changeHandler}
                >
                </Input>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <span className='text-sm'>Don't have an account? <Link to="/register" className='text-blue-600'>SignUp</Link></span>

          {
            loading ? (
              <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'>Please Wait</Loader2> </Button>
            ) : (
              <Button type="submit" className="w-full my-4 bg-black text-white cursor-pointer"
              >Login</Button>
            )
          }

        </form>
      </div>
    </div>
  )
}

export default Login
