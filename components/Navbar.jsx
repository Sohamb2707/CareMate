import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { assests } from '../constants';

const Navbar = () => {
  const [currentLocation, setCurrentLocation] = useState('Detecting location...');
  const [isLocationFetching, setIsLocationFetching] = useState(true);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false); // State to control navbar visibility

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationFromCoordinates(latitude, longitude);
        },
        () => {
          setIsLocationFetching(false);
          setCurrentLocation('Location access denied');
        }
      );
    } else {
      setIsLocationFetching(false);
      setCurrentLocation('Geolocation not supported');
    }

    // Trigger navbar appearance with delay
    const timer = setTimeout(() => {
      setIsNavbarVisible(true); // Make navbar visible after a delay
    }, 300); // Delay of 300ms

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  const fetchLocationFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();
      if (data && data.city) {
        setCurrentLocation(data.city);
      } else {
        setCurrentLocation('Location not found');
      }
    } catch (error) {
      setCurrentLocation('Error fetching location');
    }
    setIsLocationFetching(false);
  };

  const navbarStyle = {
    backgroundColor: 'white',
    color: 'black',
    position: 'fixed', // Stay fixed at the top
    width: '100%', // Full width
    top: 0, // At the top of the viewport
    zIndex: 50, // High z-index to stay above other content
  };

  const linkStyle = {
    position: 'relative',
    cursor: 'pointer',
  };

  const hoverStyle = {
    position: 'absolute',
    left: 0,
    bottom: '-2px',
    height: '2px',
    backgroundColor: 'orange',
    transition: 'width 0.3s ease-in-out',
  };

  return (
    <div>
      <nav
        className={`py-3 border-b transition-all duration-1000 ease-in-out transform ${
          isNavbarVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
        style={navbarStyle}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center">
            <img className="h-10 w-auto mr-2 object-contain" src={assests.logo} alt="Logo" />
            <span className="font-bold text-2xl tracking-wide">CareMate</span>
          </div>

          <ul className="hidden lg:flex space-x-8">
            {['Home', 'About Us', 'Services', 'Contact Us', 'Blog'].map((item, index) => (
              <li key={index} className="relative group" style={linkStyle}>
                <Link to={item === 'Home' ? '/' : `/${item.replace(' ', '-').toLowerCase()}`}>
                  <span className="text-black">{item}</span>
                </Link>
                <div
                  className="absolute left-0 bottom-0 h-1 bg-orange-600 w-0 group-hover:w-full"
                  style={hoverStyle}
                ></div>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-8">
            <div>{isLocationFetching ? 'Fetching location...' : currentLocation}</div>
            <button className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg 
                 transition duration-300 ease-in-out transform hover:bg-teal-600 hover:scale-105 delay-100">
              Book Appointment
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
