import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setFilterCompany } from '@/redux/companySlice';

const jobFilters = [
  {
    label: "Location",
    options: [
      "Remote",
      "New York",
      "Ahemdabad",
      "Mumbai", 
      "India",
      "San Francisco",
      "London",
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

  const [filterData, setFilterData] = useState("")
  const dispatch = useDispatch();

  const changeHandler = (value) =>{
    setFilterData(value);
  }
    
  useEffect(() => {
    dispatch(setFilterCompany(filterData));
  },[filterData])


  return (
    <div className=''>
      <h1 className='font-bold mb-4'>Filter Jobs</h1>

      <div>
        <RadioGroup value={filterData} onValueChange={changeHandler}>
          {
            jobFilters.map((data, index) => (
              <div key={index}>
                <h1 className='font-medium mb-2'>{data.label}</h1>
                {
                  data.options.map((item, idx) => {
                    const itemId = `id${index}-${idx}`
                    return (
                      <div className='flex gap-3 p-1' key={idx}>
                        <RadioGroupItem value={item} id={itemId} ></RadioGroupItem>
                        <Label htmlFor={itemId}>{item}</Label>
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

