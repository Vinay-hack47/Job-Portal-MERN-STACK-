import { setSingleCompany } from '@/redux/companySlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetSingleCompanyById = (companyId) => {
  const dispatch = useDispatch();
   
  useEffect(() =>{
    const getSingleCompanyById = async() =>{
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/company/get/${companyId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }) 
        if(res.data.success){
          dispatch(setSingleCompany(res.data.company))
        }
      } catch (error) {
        console.log(error);
      }
    }
    getSingleCompanyById();
  },[companyId, dispatch])
}


export default useGetSingleCompanyById;
