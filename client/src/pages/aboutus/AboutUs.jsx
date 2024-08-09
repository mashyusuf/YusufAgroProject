import React from 'react';
import cow from '../../assets/cow4.0.jpg';
import goat from '../../assets/goat4.0.jpeg';
import camel from '../../assets/camel4.0.jpg';

const AboutUs = () => {
    return (
        <div className="bg-gray-100 py-12 px-4 max-w-7xl mx-auto rounded-md mt-10 mb-10">
            <div className="container mx-auto">
                {/* Our Vision Section */}
                <section className="mb-12">
                    <h1 className='text-5xl text-center text-yellow-500 font-bold mb-10'>About Us</h1>
                    <div className="flex flex-col gap-5 lg:flex-row items-center lg:justify-between animate-fade-in">
                        
                        <div className="lg:w-1/2 mb-6 lg:mb-0 p-6 bg-white shadow-lg  rounded-lg hover:bg-blue-50 transition-colors duration-300">
                        <h2 className="text-4xl font-bold text-center mb-6 text-blue-900 relative">
                        Our Vision
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-900 transform scale-x-0 transition-transform duration-500 hover:scale-x-100"></span>
                    </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                At <span className="font-semibold text-blue-700">Yusuf's Agro</span>, our vision is to set a new standard in the livestock industry by providing the highest quality animals. We are committed to ensuring that each animal we offer is in peak health and meets our rigorous standards.
                            </p>
                            <p className="text-lg text-gray-700 mt-4 leading-relaxed">
                                Our mission is to make the buying process seamless and enjoyable, fostering trust and satisfaction with every purchase. We aim to be a leader in sustainability and ethical practices, ensuring that our animals are raised in the best environments.
                            </p>
                        </div>
                        <div className="lg:w-1/2">
                            <img src={cow} alt="Cow" className="w-full h-96 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"/>
                        </div>
                    </div>
                </section>

                {/* Our Approach Section */}
                <section className="mb-12">
                    
                    <div className="flex flex-col gap-5 lg:flex-row-reverse items-center lg:justify-between animate-fade-in">
                        <div className="lg:w-1/2 mb-6 lg:mb-0 p-6 bg-white shadow-lg rounded-lg hover:bg-green-50 transition-colors duration-300">
                        <h2 className="text-4xl font-bold text-center mb-6 text-green-900 relative">
                        Our Approach
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-green-900 transform scale-x-0 transition-transform duration-500 hover:scale-x-100"></span>
                    </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Our approach is grounded in our dedication to quality and customer satisfaction. We meticulously select our animals to ensure they meet the highest standards of health and well-being. Our team provides comprehensive support throughout the purchasing process, offering expert advice and guidance to help you make the best decision.
                            </p>
                            <p className="text-lg text-gray-700 mt-4 leading-relaxed">
                                We are committed to building lasting relationships with our customers based on trust, transparency, and exceptional service. We understand that purchasing livestock is a significant decision, and we prioritize clear communication and personalized service.
                            </p>
                        </div>
                        <div className="lg:w-1/2">
                            <img src={goat} alt="Goat" className="w-full h-96 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"/>
                        </div>
                    </div>
                </section>

                {/* Our Process Section */}
                <section>
                 
                    <div className="flex flex-col gap-5 lg:flex-row items-center lg:justify-between animate-fade-in">
                        <div className="lg:w-1/2 mb-6 lg:mb-0 p-6 bg-white shadow-lg rounded-lg hover:bg-orange-50 transition-colors duration-300">
                        <h2 className="text-4xl font-bold text-center mb-6 text-orange-900 relative">
                        Our Process
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-orange-900 transform scale-x-0 transition-transform duration-500 hover:scale-x-100"></span>
                    </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Our process is designed to ensure a seamless and efficient experience for our customers. We start by understanding your specific needs and preferences, then present a curated selection of animals that meet your criteria. Our team handles all aspects of the transaction, including documentation and logistics, to make the process as smooth as possible.
                            </p>
                            <p className="text-lg text-gray-700 mt-4 leading-relaxed">
                                From the moment you reach out to us, we are dedicated to providing exceptional service. Our process is transparent and customer-focused, with the goal of making your experience as straightforward and enjoyable as possible. We value your trust and strive to exceed your expectations at every step.
                            </p>
                        </div>
                        <div className="lg:w-1/2">
                            <img src={camel} alt="Camel" className="w-full h-96 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
