import { Button } from '@/components/ui/button'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PopoverTrigger } from '@radix-ui/react-popover'
import axios from 'axios'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const shortListingStatus = ["Accepted", "Rejected"]

const ApplicantsTable = () => {

  const { allApplicants } = useSelector((store) => store.applicants);

  const statusHandler = async(status, id) =>{
    const res = await axios.put(`http://localhost:3000/api/v1/application/status/${id}/update`, {status},{
      headers:{
        "Content-Type" : "application/json",
      },
      withCredentials: true
    })
    if(res.data.success){
        toast.success(res.data.message)
    }
    console.log(status);
    
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applicants who has applied for Job.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            allApplicants?.applications?.map((applicant, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{applicant?.applicant?.fullname}</TableCell>
                  <TableCell>{applicant?.applicant?.email}</TableCell>
                  <TableCell>{applicant?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    {applicant?.applicant?.profile?.resume ? (
                      <a href={applicant?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        {applicant?.applicant?.profile?.resumeOriginalName}
                      </a>
                    ) :  "No Resume"} 
                  </TableCell>
                  <TableCell>{applicant?.applicant?.createdAt?.split("T")?.[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent className="w-30 bg-white">
                        {
                          shortListingStatus.map((status, index) => (
                            <div onClick={() => statusHandler(status, applicant?._id)}  className='flex items-center w-fit cursor-pointer hover:bg-gray-100 px-2 py-1 rounded' key={index}>
                             {status}
                            </div>
                          ))
                        }
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              )
            })

          }
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable
