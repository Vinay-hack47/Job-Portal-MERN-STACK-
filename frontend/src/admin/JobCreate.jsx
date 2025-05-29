import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check, ChevronsUpDown } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSelector } from 'react-redux'

const JobCreate = () => {
  const { allCompanies } = useSelector((state) => state.company)

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const navigate = useNavigate()

  // Filter companies based on searchTerm (case-insensitive)
  const filteredCompanies = allCompanies
    .filter((company) =>
      company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((company) => ({
      label: company.name,
      value: company._id,
    }))


  return (
    <div>
      <Navbar />
      <div className='max-w-xl mx-auto my-5 p-5'>
        <div className='border p-5 rounded-lg bg-white shadow-md border-gray-200'>

          <h1 className='font-bold text-xl text-center mb-5'>Create a new Job</h1>

          <div>
            <h1 className='font-medium text-black'>List of all Companies</h1>
            {
              allCompanies?.length > 0 &&
              <div className='flex items-center gap-2 mt-1 mb-5'>
                <h1 className='font-medium text-black'>Total Companies:</h1>
                <span className='font-bold text-blue-700'>{allCompanies?.length}</span>
              </div>
            }
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[250px] justify-between"
                >
                  {value
                    ? filteredCompanies.find((company) => company.value === value)?.label
                    : "Select company..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0 bg-white shadow-lg rounded-md">
                <Command>
                  <CommandInput
                    placeholder="Search company..."
                    className="h-9"
                    value={searchTerm}
                    onValueChange={(text) => setSearchTerm(text)}
                  />
                  <CommandList>
                    <CommandEmpty>No company found.</CommandEmpty>
                    <CommandGroup>
                      {filteredCompanies.map((company) => (
                        <CommandItem
                          key={company.value}
                          value={company.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setSearchTerm("")
                            setOpen(false)
                          }}
                        >
                          {company.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === company.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className='flex items-center gap-60 mt-5 justify-center'>
            <Button variant="outline" className="bg-blue-700 text-white cursor-pointer mt-5 " onClick={() => navigate(`/admin/jobs`)}
            ><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>

            {
              value ? (
                <Button variant="outline" className="bg-blue-700 text-white cursor-pointer mt-5 " onClick={() => navigate(`/admin/jobs/create/${value}`)}
                > Continue</Button>
              ) : (
                <Button variant="outline" className="bg-gray-400 text-white cursor-not-allowed mt-5 cursor-pointer" disabled> Continue</Button>
              )
            }

          </div>

          <div className='flex items-center justify-center mt-5'>
            {
              allCompanies?.length <= 0 && <span className='text-sm text-red-600 font-bold'>First register a company before Posting a Job.</span>

            }

          </div>

        </div>
      </div>
    </div>
  )
}

export default JobCreate
