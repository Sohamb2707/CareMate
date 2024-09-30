import React, { useEffect, useState } from 'react';
import service1 from '../assets/service1.jpg';

const Services = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Set visibility of cards with a delay after the component mounts
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300); // Adjust the delay time as needed (300ms here)

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='flex flex-col p-4 h-[150vh] bg-gray-100'>
            <h1 className='text-3xl font-bold text-center mt-20'>
                Empowering Elders with Trust and Care
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-20'>
                {[
                    { title: 'Special Care', img: service1, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quod quidem voluptatibus aliquid.' },
                    { title: 'Medical Check', img: service1, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quod quidem voluptatibus aliquid.' },
                    { title: 'Senior Care', img: service1, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quod quidem voluptatibus aliquid.' },
                    { title: 'Emergency Service', img: service1, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quod quidem voluptatibus aliquid.' },
                    { title: 'Homecare Visit', img: service1, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quod quidem voluptatibus aliquid.' },
                    { title: 'Senior Therapy', img: service1, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quod quidem voluptatibus aliquid.' },
                ].map((service, index) => (
                    <div
                        key={index}
                        className={`card bg-white shadow-lg rounded-lg p-4 relative w-[90%] mx-auto my-4 border transform transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            transitionDelay: `${index * 200}ms`, // Add delay for each card
                        }}
                    >
                        <img
                            src={service.img}
                            alt={service.title}
                            className="w-20 h-20 object-cover border rounded-md absolute -top-10 left-4"
                        />
                        <div className="pt-16"> {/* Padding top to create space for the image */}
                            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <a href="#" className="text-blue-500 hover:underline">Learn more</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
