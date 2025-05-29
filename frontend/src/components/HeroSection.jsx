// import React, { useState } from 'react'
// import { Button } from './ui/button'
// import { Search } from 'lucide-react'
// import { useDispatch } from 'react-redux';
// // import { setSearchedQuery } from '@/redux/jobSlice';
// import { useNavigate } from 'react-router-dom';

// const HeroSection = () => {
//     const [query, setQuery] = useState("");
//     // const dispatch = useDispatch();
//     // const navigate = useNavigate();

//     const searchJobHandler = () => {
//         // dispatch(setSearchedQuery(query));
//         // navigate("/browse");
//     }

//     return (
//         <div className='text-center'>
//             <div className='flex flex-col gap-5 my-10'>
//                 <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
//                 <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
//                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!</p>
//                 <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
//                     <input
//                         type="text"
//                         placeholder='Find your dream jobs'
//                         onChange={(e) => setQuery(e.target.value)}
//                         className='outline-none border-none w-full'

//                     />
//                     <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
//                         <Search className='h-5 w-5' />
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HeroSection;


import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { setFilterJobByText } from '@/redux/jobSlice';

const HeroSection = () => {
  // const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const searchJobHandler = () => {
  //   dispatch(setFilterJobByText(query));
  //   navigate('/browse');
  // }

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium">
          Your Global Tech Career Starts Here
        </span>

        <h1 className="text-5xl font-bold leading-tight">
          Discover Opportunities. <br />
          Build Your <span className="text-[#1447e6]">Dream Career</span>
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto">
          Explore top tech jobs from around the world — whether you're just starting out or looking for your next big move.
        </p>

        <div className="flex w-full max-w-xl mx-auto shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4">
          <input
            type="text"
            placeholder="Search jobs by title, company, or keyword"
            onChange={(e) => dispatch(setFilterJobByText(e.target.value))}
            className="outline-none border-none w-full text-sm py-3"
          />
          <Button onClick={() => navigate("/browse")} className="rounded-r-full bg-[#1447e6] cursor-pointer">
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>

        <Button className="mt-3 bg-[#1447e6] text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-[#1447e6] transition">
          Explore Opportunities
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
