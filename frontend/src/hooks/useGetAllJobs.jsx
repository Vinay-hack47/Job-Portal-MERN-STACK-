import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((store) => store.auth);
   
  useEffect(() =>{
    const getAllJobs = async() =>{
      try {
        const res = await axios.get("http://localhost:3000/api/v1/job/get", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }) 
        if(res.data.success){
          dispatch(setAllJobs(res.data.jobs))
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllJobs();
  },[dispatch, user?._id])
}


export default useGetAllJobs;
