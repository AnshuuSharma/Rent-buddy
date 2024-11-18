import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import GetStarted from '../components/GetStarted/GetStarted';
import Header from '../components/Header/Header'
// import Company from '../components/Companies/Companies';
import Hero from '../components/Hero/Hero';
import Residencies from "../components/Residencies/Residencies";
import Value from "../components/value/value";
import React from 'react'

const Website = () => {
  return (
    <div className="App">

    
    <Hero/>
    {/* <Company/> */}
    <Residencies/>
    <Value/>
    <Contact/>
    <GetStarted/>
    </div>
    
  )
}

export default Website