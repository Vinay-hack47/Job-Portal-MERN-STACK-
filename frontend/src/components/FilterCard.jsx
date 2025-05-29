import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const jobFilters = [
  {
    label: "Location",
    options: [
      "Remote",
      "New York",
      "San Francisco",
      "London",
      "Berlin",
      "Toronto",
    ]
  },
  {
    label: "Job Type",
    options: [
      "Full-time",
      "Part-time",
      "Contract",
      "Internship",
      "Freelance",
      "Temporary"
    ]
  },
  {
    label: "Salary Range",
    options: [
      "0 - 20,000",
      "20,000 - 40,000",
      "40,000 - 60,000",
      "60,000 - 80,000",
      "80,000 - 1,00,000",
      "1,00,000+"
    ]
  }
];


const FilterCard = () => {
  return (
    <div className=''>
      <h1 className='font-bold mb-4'>Filter Jobs</h1>

      <div>
        <RadioGroup>
          {
            jobFilters.map((data, index) => (
              <div key={index}>
                <h1 className='font-medium mb-2'>{data.label}</h1>
                {
                  data.options.map((item, index) => {
                    return (
                      <div className='flex gap-3 p-1' key={index}>
                        <RadioGroupItem value={item}></RadioGroupItem>
                        <Label>{item}</Label>
                      </div>
                    )
                  })
                }
              </div>
            ))
          }
        </RadioGroup>
      </div>
    </div>
  )
}

export default FilterCard

