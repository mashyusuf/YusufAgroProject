import { useEffect, useState } from 'react';
import image1 from '../../../assets/image1.webp';
import image2 from '../../../assets/image2.webp';
import image3 from '../../../assets/image3.jpg';
import image4 from '../../../assets/image4.jpg';
import image5 from '../../../assets/image5.jpg';
import image6 from '../../../assets/image6.jpg';
import image7 from '../../../assets/image7.webp';
import special from '../../../assets/offer.avif';
import eid from '../../../assets/eid.jpg';
import membership from '../../../assets/membership.avif';
import dis from '../../../assets/letsee.webp';
import { Link } from 'react-router-dom';


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
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ transition: 'opacity 1s ease-in-out', opacity: index === currentSlide ? 1 : 0 }}
          >
            <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-r from-black via-transparent to-black text-white p-4">
              <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">{slide.text}</h2>
              <p className="text-lg text-center mb-6">{slide.description}</p>
              <div className="flex space-x-4">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-transform transform hover:scale-105">Get Start</button>
                <Link to={'/market'}><button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition-transform transform hover:scale-105">Shop Now</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Section with Cards (Hot Sellers) */}
      <div className="bg-gray-100 py-8">
  <div className="px-4">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      
      {/* Special Offer Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform">
        <img src={special} alt="Special Offer" className="w-full h-40 object-cover rounded-t-lg mb-4" />
        <h3 className="text-xl font-bold mb-2 text-gray-800">Special Offer on Premium Cows</h3>
        <p className="text-sm text-gray-600 mb-2">
          Grab this exclusive deal on our handpicked premium cows. Limited time only!
        </p>
        <div className='flex justify-center space-x-4 items-center'>
          <p className="text-xl font-bold text-green-600 mb-4 relative">
            <span className="absolute inset-0 flex items-center justify-center opacity-20">
              <svg className="w-12 h-12 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6"></path>
              </svg>
            </span>
            Up to 20% Off
          </p>
          <button 
            className="relative text-xl font-bold bg-yellow-500 text-white cursor-not-allowed opacity-70 shadow-md rounded-lg px-6 py-3 transition-transform transform hover:scale-105 hover:bg-yellow-400" 
            disabled
          >
            Available Now
            <span className="absolute inset-0 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Eid Offer Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform">
        <img src={eid} alt="Eid Offer" className="w-full h-40 object-cover rounded-t-lg mb-4" />
        <h3 className="text-xl font-bold mb-2 text-gray-800">Eid Special on Goats</h3>
        <p className="text-sm text-gray-600 mb-2">
          Celebrate Eid with our finest goats. Special prices just for the festive season!
        </p>
        <div className='flex justify-center space-x-4'>
          <p className="text-green-500 font-bold mt-2">Save Big This Eid</p>
          <p className="text-yellow-500 font-bold mt-2">Coming Soon</p>
        </div>
      </div>

      {/* Membership Offer Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform">
        <img src={membership} alt="Membership Offer" className="w-full h-40 object-cover rounded-t-lg mb-4" />
        <h3 className="text-xl font-bold mb-2 text-gray-800">Become a Yusuf Agro Member</h3>
        <p className="text-sm text-gray-600 mb-2">
          Join our membership and enjoy exclusive deals on all livestock, including buffaloes and camels.
        </p>
        <p className="text-green-500 font-bold mt-2">Exclusive Member Discounts, Contact Us</p>
      </div>

    </div>
  </div>
</div>


{/* Weekly Offers Section */}
<div className="relative text-white py-8">
  <img src={dis} alt="Weekly Discounts" className="absolute inset-0 w-full h-full object-cover opacity-60 rounded-lg" />
  <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-2">Main Offer: Buy 3-4 Products This Week and Get an Exclusive Discount!</h2>
    <p className="text-lg mb-4">
      For a limited time, enjoy special discounts when you purchase three or more products from our collection. The more you buy, the more you save!
    </p>
    <p className="text-lg font-bold mb-4 text-red-300">Limited Time Offer! Up to 20% Off!</p>
    <Link to={'/market'}>
    <button  className="bg-red-600 text-white font-bold px-8 py-3 rounded-lg shadow hover:bg-red-700 transition-transform transform hover:scale-105">
      Shop & Save
    </button></Link>
    <p className="text-sm mt-4 italic">Hurry, Before the Week Ends!</p>
  </div>
</div>


    </div>
  );
};

export default Banner;
