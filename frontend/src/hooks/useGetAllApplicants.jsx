import { setAllApplicants } from '@/redux/applicantSlice';
import { setAllAdminJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllApplicants = (jobId) => {
  const dispatch = useDispatch();
  const {user} = useSelector((store) => store.auth);
   
  useEffect(() =>{
    const getAllApplicants= async() =>{
      try {
        const res = await axios.get(`https://career-path-hqsu.onrender.com/api/v1/application/${jobId}/applicants`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }) 
        if(res.data.success){
          dispatch(setAllApplicants(res.data.job))
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllApplicants();
  },[dispatch, jobId])
}


export default useGetAllApplicants;
