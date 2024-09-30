import React, { useState, useEffect } from 'react';
import blogImg from '../assets/blogImg.jpeg';
import { assests } from '../constants';

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-gray-100 min-h-screen flex flex-col p-6">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center bg-opacity-70" style={{ backgroundImage: `url(${assests.aboutImg3})` }}>
        <div className="w-full h-full bg-black opacity-80 absolute"></div>
        <div className={`relative z-10 text-center mt-40 transition-all duration-1000 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-white mb-4">Blogs</h2>
          <p className="text-gray-300 mt-2 text-lg">Your go-to resource for navigating the challenges of caring for seniors.</p>
        </div>
      </div>

      <div className="relative bg-white shadow-md rounded-lg overflow-hidden w-full max-w-6xl flex flex-col md:flex-row items-center justify-center mt-60 mx-auto z-10 p-7 h-[600px]">
        <div className="w-full md:w-1/2 pt-3 h-full flex items-center">
          <img src={blogImg} alt="About Us" className="object-cover w-full h-full rounded-lg" />
        </div>
        <div className={`w-full md:w-1/2 p-10 pt-3 flex flex-col h-full text-left justify-start transition-all duration-1000 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-4xl font-bold mb-4">The Benefits of Regular Check-ups for Seniors</h1>
          <h3 className="text-lg text-gray-700 mb-4">Prioritizing the health of seniors is essential for early detection of diseases and overall well-being.</h3>
          <p className="text-gray-700 mb-4">Regular check-ups allow for early diagnosis of potential health issues and ensure seniors are receiving the necessary care. Find out how regular medical visits contribute to longevity and a better quality of life.</p>
          <button className="bg-teal-600 text-white px-6 py-3 mt-4 rounded-md transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105">Read more</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
