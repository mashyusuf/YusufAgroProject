import { useEffect, useState } from 'react';
import image1 from '../../../assets/image1.webp';
import image2 from '../../../assets/image2.webp';
import image3 from '../../../assets/image3.jpg';
import image4 from '../../../assets/image4.jpg';
import image5 from '../../../assets/image5.jpg';
import image6 from '../../../assets/image6.jpg';
import image7 from '../../../assets/image7.webp';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: image1,
      text: 'Discover Our Healthy and Productive Cows',
      description: 'Find the perfect cattle for your farm with our top-quality breeds.',
    },
    {
      image: image2,
      text: 'Browse Our Strong and Resilient Buffaloes',
      description: 'Explore buffaloes known for high milk yield and strength.',
    },
    {
      image: image3,
      text: 'Energetic and Agile Goats',
      description: 'Learn about goats bred for their milk, meat, and environmental benefits.',
    },
    {
      image: image4,
      text: 'Find Your Sturdy and Versatile Camels',
      description: 'Discover camels known for their endurance, milk, and meat production.',
    },
    {
      image: image5,
      text: 'Exclusive Offers on Premium Livestock',
      description: 'Don’t miss out on our exclusive offers for top-quality livestock.',
    },
    {
      image: image6,
      text: 'Healthy and Productive Cows',
      description: 'Explore our range of cows known for their health and productivity.',
    },
    {
      image: image7,
      text: 'Top Quality Livestock for Sale',
      description: 'Check out our selection of cows, goats, buffaloes, and camels.',
    },
  ];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 3000); // Change slide every 3 seconds
  
      return () => clearInterval(interval);
    }, [slides.length]);
  
    return (
      <div className="relative w-full max-w-7xl mx-auto mt-8 overflow-hidden rounded-lg shadow-lg mb-10">
        <div className="relative h-96">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              style={{ transition: 'opacity 1s ease-in-out', opacity: index === currentSlide ? 1 : 0 }}
            >
              <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-r from-black via-transparent to-black text-white p-4">
                <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">{slide.text}</h2>
                <p className="text-lg text-center mb-6">{slide.description}</p>
                <div className="flex space-x-4">
                  <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-transform transform hover:scale-105">Get Start</button>
                  <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition-transform transform hover:scale-105">Shop Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-500'}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    );
  };
  
  export default Banner;
  