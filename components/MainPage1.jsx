import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { assests } from '../constants';

const MainPage1 = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [isVisible, setIsVisible] = useState(false); // State to track animation visibility

  const handleGetStartedClick = () => {
    navigate('/services'); // Navigate to the Services page
  };

  useEffect(() => {
    // Trigger animation after a delay
    const timer = setTimeout(() => {
      setIsVisible(true); // Set visibility to true after delay
    }, 300); // Delay of 300ms before animation

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div
      className="w-full h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url(${assests.mainPage1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden', // Prevent overflow
      }}
    >
      {/* Overlay to enhance text visibility */}
      <div className="absolute inset-0 bg-black opacity-70" />

      {/* Content Container */}
      <div className="flex w-full h-full justify-center items-center relative z-10">
        {/* Left Part */}
        <div className="left-part flex flex-col items-center w-[70%] justify-center space-y-8">
          <h1
            className={`font-bold text-5xl px-10 text-center text-white transition-all duration-1000 ease-in-out 
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            Caring Hands for Your Golden Years!
          </h1>
          <p
            className={`font-medium text-center px-10 text-white transition-all duration-1000 ease-in-out delay-200
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            Where Expertise Meets Compassion to Ensure the Well-Being of Your Loved Ones
          </p>
          <div
            className={`flex justify-center w-full transition-all duration-1000 ease-in-out delay-500 
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <button
              className='w-40 h-10 mt-5 bg-teal-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105'
              onClick={handleGetStartedClick} // Add onClick event handler
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage1;
