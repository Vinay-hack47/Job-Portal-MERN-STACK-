import { setAllCompanies } from '@/redux/companySlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
   
  useEffect(() =>{
    const getAllCompanies = async() =>{
      try {
        const res = await axios.get("https://career-path-hqsu.onrender.com/api/v1/company/get", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }) 
        if(res.data.success){
          dispatch(setAllCompanies(res.data.companies))
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllCompanies();
  },[dispatch])
}


export default useGetAllCompanies;
