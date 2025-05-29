import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Edit2, MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {


  const { allCompanies, searchCompanyByText } = useSelector((state) => state.company);
  const [filterCompany, setFilterCompany] = useState(allCompanies);

  //todo Filter the companies by name
  //todo If the searchCompanyByText is empty, then show all companies
  useEffect(() => {
    const filteredCompany = allCompanies.length >= 0 && allCompanies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }
      return company?.name?.toLowerCase()?.includes(searchCompanyByText?.toLowerCase());
    });
    setFilterCompany(filteredCompany);

  }, [allCompanies, searchCompanyByText]);


  const navigate = useNavigate();

  return (
    <div className='my-5'>
      <Table>
        <TableCaption>A list of your created Company.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-gray-600">Logo</TableHead>
            <TableHead className="font-bold text-gray-600">Company Name</TableHead>
            <TableHead className="font-bold text-gray-600">Date</TableHead>
            <TableHead className="font-bold text-gray-600 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {
            filterCompany.length <= 0 ? <span>You have't registered any company Yet.</span> :

              <>
                {
                  filterCompany.map((company) => {
                    return (
                      <TableRow key={company?._id}>
                        <TableCell>
                          <Avatar>
                            <AvatarImage src={company?.logo} alt="Company Logo" className="w-12 h-12" /></Avatar>
                        </TableCell>
                        <TableCell>{company?.name}</TableCell>
                        <TableCell>{company?.createdAt?.split("T")?.[0]}</TableCell>
                        <TableCell className="text-right">
                          <Popover>
                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                            <PopoverContent className="w-20 bg-white shadow-lg rounded-md p-2 ">
                              <div className='flex items-center gap-2 cursor-pointer'>
                                <Button onClick={() => navigate(`/admin/companies/create/${company?._id}`)} size={25} className="cursor-pointer"><Edit2 size={20}></Edit2> <span className='font-medium'>Edit</span></Button>
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

export default CompaniesTable
