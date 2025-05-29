import { setAllAdminJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((store) => store.auth);
   
  useEffect(() =>{
    const getAllAdminJobs = async() =>{
      try {
        const res = await axios.get("http://localhost:3000/api/v1/job/getadminjobs", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }) 
        if(res.data.success){
          dispatch(setAllAdminJobs(res.data.jobs))
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllAdminJobs();
  },[dispatch, user?._id])
}


export default useGetAllAdminJobs;
