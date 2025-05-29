import clsx from 'clsx'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'


const AppliedJobTable = () => {
  const { appliedJobs } = useSelector((store) => store.job)
  console.log(appliedJobs);

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            appliedJobs.length > 0 && appliedJobs.map((job) => {
              return (

                <TableRow key={job?._id}>
                  <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>{job?.job?.title}</TableCell>
                  <TableCell>{job?.job?.company?.name}</TableCell>
                  <TableCell className="text-right"><Badge
                    className={clsx("rounded-full", {
                      "bg-gray-500": job?.status === "pending",
                      "bg-red-500": job?.status === "rejected",
                      "bg-green-500": job?.status === "accepted",
                    })}
                  >
                    {job?.status?.toUpperCase()}
                  </Badge></TableCell>
                </TableRow>
              )
            })
          }

        </TableBody>

      </Table>
    </div>
  )
}

export default AppliedJobTable
