import { useState } from 'react';
import SectionTitle from '../../../../componenets/SectionTitle/SectionTitle';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaStar, FaMapMarkerAlt, FaRegMoneyBillAlt, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../../../../hooks/useAxiosCommon';

const PopularAnimal = () => {
  const axiosCommon = useAxiosCommon(); // Correct the function call to get the axios instance

  const { data: discountItems = [],isLoading } = useQuery({
    queryKey: ['discountProducts'],
    queryFn: async () => {
      const res = await axiosCommon.get(`/discountItems`);
      return res.data;
    },
  });
  if(isLoading){
    return <div className="flex items-center justify-center min-h-screen">
    <span className="loading text-9xlxl loading-spinner text-info"></span>
</div>
}
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className='mt-10  bg-cover bg-center' style={{ backgroundImage: 'url(https://example.com/your-background-image.jpg)' }}>
     <div className="text-center py-8 bg-gray-100">
  <h1 className="text-3xl font-bold text-yellow-500 mb-2">
    Special Discounts on Select Products!
  </h1>
  <p className="text-lg text-gray-600 mx-auto max-w-3xl">
    Take advantage of our exclusive discounts on a range of products. Save big on select items and enjoy incredible value. Shop now to get the best deals!
  </p>
</div>

      <div className='container mx-auto mt-5'>
        <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
          {discountItems.map(item => {
            // Calculate the discounted price
            const discountedPrice = item.price - (item.price * (item.discount / 100));

            return (
              <div key={item._id} className="p-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h2>
                    <p className="text-gray-600 flex items-center mb-2">
                      <FaMapMarkerAlt className="mr-2" /> {item.location}
                    </p>
                    <p className="text-gray-600 flex items-center mb-2">
                      <FaRegMoneyBillAlt className="mr-2" /> Price : 
                      <span className="font-bold text-green-600 text-4xl ml-2">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      {item.discount > 0 && (
                        <span className="line-through text-red-500 ml-2">${item.price.toFixed(2)}</span>
                      )}
                    </p>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex items-center mb-4">
                      <FaStar className="text-yellow-500 mr-2" />
                      <span className="text-gray-800">{item.rating}</span>
                    </div> 
                    <Link to={`/buyNow/${item._id}`}>
                      <button
                        className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-lg shadow-md w-full hover:from-blue-500 hover:to-green-400 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                      >
                        <FaInfoCircle className="mr-2" /> View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default PopularAnimal;
