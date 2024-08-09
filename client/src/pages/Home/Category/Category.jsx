import React, { useState } from 'react';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Category = () => {
    const axiosCommon = useAxiosCommon();
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const { data: allCategory = [] } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const res = await axiosCommon.get('/category');
            return res.data;
        }
    });

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? allCategory.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === allCategory.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto">
            <h1 className='text-4xl text-yellow-500 text-center mt-10 mb-10 font-bold'>Chose Your Category</h1>
            <div className="flex justify-between absolute inset-y-1/2 w-full">
                <button onClick={handlePrevClick} className=" bg-white rounded-full shadow-md text-gray-700">
                    <FaChevronLeft />
                </button>
                <button onClick={handleNextClick} className=" bg-white rounded-full shadow-md text-gray-700">
                    <FaChevronRight />
                </button>
            </div>
            <div className="flex justify-center items-center overflow-hidden">
                {allCategory.map((item, index) => (
                    <Link
                        to={`/categoryCard/${item.category}`}
                        key={item._id}
                        className={`transform transition-transform duration-300 ${index === currentIndex ? 'scale-105 z-10' : 'scale-75 z-0'}`}
                        style={{
                            display: index === currentIndex || index === (currentIndex + 1) % allCategory.length || index === (currentIndex - 1 + allCategory.length) % allCategory.length ? 'block' : 'none'
                        }}
                    >
                        <div className="max-w-xl p-6 shadow-lg bg-gradient-to-r from-sky-400 to-green-400 rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
                            <div className="flex justify-between pb-4 border-b border-gray-200">
                                <div className="flex items-center">
                                    <p className="text-xl font-semibold capitalize text-white">{item.name}</p>
                                    <FaStar className="ml-2 text-yellow-300" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <img src={item.image} alt="" className="w-full h-72 object-cover object-center rounded-md" />
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <h3 className="text-2xl font-semibold text-white">{item.category}</h3>
                                <FaArrowRight className="text-white" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Category;
