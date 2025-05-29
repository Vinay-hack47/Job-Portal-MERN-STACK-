import Navbar from '@/components/shared/Navbar'
import React from 'react'
import ApplicantsTable from './ApplicantsTable'
import useGetAllApplicants from '@/hooks/useGetAllApplicants';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Applicants = () => {
  const params = useParams();
  const jobId = params.id;
  useGetAllApplicants(jobId);

  const {allApplicants} = useSelector((store) => store.applicants)

  const totalApplicants = allApplicants?.applications?.length;

  return (
    <div>
      <Navbar></Navbar>

      <div className='max-w-7xl mx-auto mt-5'>
        <h1 className='font-bold text-xl mb-5'>Total Applicants ({totalApplicants})</h1>

        <ApplicantsTable></ApplicantsTable>
      </div>
    </div>
  )
}

export default Applicants
