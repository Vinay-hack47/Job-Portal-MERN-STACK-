import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const {user} = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.role === "recruiter"){
      navigate("/admin/companies")
    }
  },[])
  return (
    <div>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <CategoryCarousel></CategoryCarousel>
      <LatestJobs></LatestJobs>
      <Footer></Footer>
    </div>
  )
}

export default Home
// onClick={() => navigate(`/description/${job?._id}`)}