import React from 'react'
import './Hero.css';
import SearchBar from '../SearchBar/SearchBar';
export const Hero = () => {
  return (
    <section className=" hero-wrapper">
        <div className=" innerWidth flexCenter  hero-container   ">
            {/* left */}
            <div className="flexColStart hero-left">
                <div className="hero-title">
                    <div className="orange-circle"/>
                    <h1 >
                        Elevate Your<br/> Living Experience
                    </h1>
                </div>
                <div className="flexColStart hero-des">
                        <span className="secondaryText">Find your dream space and level up your style of living with RentBuddy</span><br/>
                        <span className="secondaryText">Renting rooms made easy for you </span>
                </div>
               <SearchBar/>
            </div>

    
        {/* right */}
        <div className=" flexCenter hero-right">
            <div className="image-container">
                <img src="./valuehome.jpg" alt="home" />
            </div>
        </div>
        </div>
    </section>
  )
}
export default Hero;
