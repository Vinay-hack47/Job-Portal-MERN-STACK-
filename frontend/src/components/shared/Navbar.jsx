import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Link, useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { setUser } from '@/redux/authSlice'


const Navbar = () => {

  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isStudent = user?.role === "student" ? true : false;

  const logoutHandler = async () => {
    try {

      const res = await axios.post("https://career-path-hqsu.onrender.com/api/v1/user/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(null));
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return <>
    <div className='bg-white'>

      {/* left-part */}
      <div className='flex item-center justify-between mx-auto max-w-7xl h-16'>
        <h1 className='text-2xl font-bold'>Career<span className='text-red-700'>Path</span></h1>


        {/* right-part */}
        <div className='flex items-center justify-between gap-5'>
          {
            isStudent ?
              (<ul className='flex items-center gap-4 font-medium'>
                <Link to="/"><li>Home</li></Link>
                <Link to="/jobs"><li>Jobs</li></Link>
                <Link to="/browse"><li>Browse</li></Link>
              </ul>)
              :
              (<ul className='flex items-center gap-4 font-medium'>
                <Link to="/admin/companies"><li>Companies</li></Link>
                <Link to="/admin/jobs"><li>Jobs</li></Link>
              </ul>)
          }

          {
            user ? (
              <div>
                <Popover >
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto ? (user?.profile?.profilePhoto) : ("https://github.com/shadcn.png")} alt="@shadcn" />

                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white ">
                    <div>
                      <div className='flex gap-2 space-y-2'>
                        <Avatar className="cursor-pointer">
                          <AvatarImage src={user?.profile?.profilePhoto ? (user?.profile?.profilePhoto) : ("https://github.com/shadcn.png")} alt="@shadcn" />
                        </Avatar>

                        <div className='w-full'>
                          <h4 className='font-medium'>{user?.fullname}</h4>
                          <p className='text-sm text-muted-foreground  flex font-medium text-gray-600'>Welcome to the CareerPath.</p>
                        </div>
                      </div>

                      <div className='flex flex-col my-2 text-gray-600'>
                        {
                          user && user.role === "student" && (<div className='flex w-fit items-center gap-2 cursor-pointer'>
                            <User2 />
                            <Button className="cursor-pointer" variant="link"><Link to="/profile" >View Profile</Link></Button>
                          </div>)
                        }



                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                          <LogOut />
                          <Button className="cursor-pointer" variant="link" onClick={logoutHandler}>Logout</Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <div className='flex items-center gap-4'>
                <Link to='/login'>
                  <Button className='bg-[#1447e6] text-white hover:bg-red-800 cursor-pointer'>Login</Button>
                </Link>

                <Link to='/register'>
                  <Button className='bg-[#1447e6] text-white hover:bg-red-800 cursor-pointer'>SignUp</Button>
                </Link>
              </div>
            )
          }


        </div>
      </div>
    </div>


  </>
}

export default Navbar
