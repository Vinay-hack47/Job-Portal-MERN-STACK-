import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {

  const [input, setInput] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllCompanies();

  useEffect(() =>{
      dispatch(setSearchCompanyByText(input))
  }, [input, dispatch])
  return (
    <div>
      <Navbar></Navbar>

      <div className='max-w-6xl mx-auto my-5 p-5'>
      <div className='flex items-center justify-between '>
        <Input className="w-fit " placeholder="Filter by Name" onChange={(e) => setInput(e.target.value)}></Input>
        <Button variant="outline" className="text-md bg-blue-700 text-white cursor-pointer" onClick={() => navigate("/admin/companies/create")}>New Company</Button>
      </div>

      <CompaniesTable></CompaniesTable>
      </div>
    </div>
  )
}

export default Companies
