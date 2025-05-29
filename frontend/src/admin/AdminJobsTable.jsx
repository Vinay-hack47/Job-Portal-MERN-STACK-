import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {

const {allAdminJobs, searchJobByText} = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  //todo Filter the companies by name
  //todo If the searchCompanyByText is empty, then show all companies
  useEffect(() => {
    const filteredJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return job?.title?.toLowerCase()?.includes(searchJobByText?.toLowerCase()) || job?.company?.name?.toLowerCase()?.includes(searchJobByText?.toLowerCase());
    });
    setFilterJobs(filteredJob);

  }, [allAdminJobs, searchJobByText]);


  const navigate = useNavigate();

  return (
    <div className='my-5'>
      <Table>
        <TableCaption>A list of your recent posted Jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-gray-600">Company Name</TableHead>
            <TableHead className="font-bold text-gray-600">Role</TableHead>
            <TableHead className="font-bold text-gray-600">Date</TableHead>
            <TableHead className="font-bold text-gray-600 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {
            filterJobs.length <= 0 ? <span>You have't created any Job Yet.</span> :

              <>
                {
                  filterJobs.map((job) => {
                    return (
                      <TableRow key={job?._id}>
                        <TableCell>{job?.company?.name}</TableCell>
                        <TableCell>{job?.title}</TableCell>
                        <TableCell>{job?.createdAt?.split("T")?.[0]}</TableCell>
                        <TableCell className="text-right">
                          <Popover>
                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                            <PopoverContent className="w-28 bg-white shadow-lg rounded-md p-2 ">
                              <div className='flex items-center gap-2 cursor-pointer mb-1'>
                                <Button onClick={() => navigate(`/admin/jobs/create/${job?._id}`)} size={25} className="cursor-pointer"><Edit2 size={20}></Edit2>Edit </Button>
                              </div>
                              <div className='flex items-center gap-2 cursor-pointer'>
                                <Button onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)} size={25} className="cursor-pointer"><Eye size={20}></Eye>Applicants </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                      </TableRow>

                    )
                  })
                }
              </>

          }

        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable
