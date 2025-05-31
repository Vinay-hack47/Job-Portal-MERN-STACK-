import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from "framer-motion";


const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  const { filterCompany } = useSelector((store) => store.company);

  const [filterCompanyOrJob, setFilterCompanyOrJob] = useState(allJobs);

  useEffect(() => {
    const filteredCompanies = allJobs.length > 0 && allJobs.filter((company) => {
      if (!filterCompany) {
        return true;
      }
      return company?.jobType?.toLowerCase().includes(filterCompany.toLowerCase()) || company?.location?.toLowerCase().includes(filterCompany.toLowerCase())
    })
    setFilterCompanyOrJob(filteredCompanies);
  }, [filterCompany, allJobs])
  return (
    <div>
      <Navbar></Navbar>

      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-2'>
          <div className='w-20%'>
            <FilterCard></FilterCard>
          </div>

          {
            filterCompanyOrJob.length <= 0 ? <span className='mx-auto my-auto mt-65 text-2xl font-bold text-blue-600 '>NO JOBS FOUND !</span> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {
                    filterCompanyOrJob.map((job, index) => (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        key={job?._id}
                      >
                        <Job job={job} />
                      </motion.div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs
