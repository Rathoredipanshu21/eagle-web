import React from 'react'
import Hero from '../Components/Hero';
import AboutPreview from '../Components/AboutPreview';
import HorizontalScroll from '../Components/HorizontalScroll';
import Capital from '../Components/Capital';
import Pipeline from '../Components/Pipeline';
import Services from '../Components/Services';
import WhyChooseUs from '../Components/WhyChooseUs';
import LongScrollablePage from '../Components/LongScrollablePage';

const Home = () => {
  return (
   <>
   <Hero/>
   <Services/>
   <AboutPreview/>
   <HorizontalScroll/>
   <Capital/>
   <Pipeline/>
   <WhyChooseUs/>
   <LongScrollablePage/>
   </>
  )
}

export default Home