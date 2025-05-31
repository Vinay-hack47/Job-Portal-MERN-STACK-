import { setAppliedJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((store) => store.auth);
   
  useEffect(() =>{
    const getAllAppliedJobs = async() =>{
      try {
        const res = await axios.get("https://career-path-hqsu.onrender.com/api/v1/application/get", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }) 
        if(res.data.success){
          dispatch(setAppliedJobs(res.data.applications))
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllAppliedJobs();
  },[dispatch, user?._id])
}


export default useGetAllAppliedJobs;

