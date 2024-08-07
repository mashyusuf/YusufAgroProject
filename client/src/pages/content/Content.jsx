import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import cow from '../../assets/cow2.0.jpg';
import goat from '../../assets/goat2.0.jpg';
import buf from '../../assets/buf2.0.avif';
import cam from '../../assets/camel2.0.webp';

const Content = () => {
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    return (
        <section className="bg-gradient-to-r from-sky-300 to-sky-100 py-12 mt-10">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-teal-700">Care Guides</h2>
                <p className="text-center mb-12 text-gray-700">Learn how to care for our animals with our comprehensive guides.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* Cow Care Guide */}
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
                        <img src={cow} alt="Cow" className="w-full h-40 object-cover rounded-t-lg mb-4" />
                        <h3 className="text-xl font-semibold mb-4 text-teal-800">Cow Care Guide</h3>
                        <p className="text-gray-600 mb-4 text-md">Discover essential tips and practices for keeping cows healthy and happy. This guide covers feeding, shelter, and health care.</p>
                        <button
                            onClick={() => openModal('Cow Care Guide Details')}
                            className="flex items-center text-teal-600 hover:text-teal-800 font-medium">
                            Read More <FaChevronRight className="ml-2" />
                        </button>
                    </div>
                    {/* Buffalo Care Guide */}
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
                        <img src={buf} alt="Buffalo" className="w-full h-40 object-cover rounded-t-lg mb-4" />
                        <h3 className="text-xl font-semibold mb-4 text-teal-800">Buffalo Care Guide</h3>
                        <p className="text-gray-600 mb-4 text-md">Learn everything you need to know about buffalo care and maintenance, including diet, housing, and health management.</p>
                        <button
                            onClick={() => openModal('Buffalo Care Guide Details')}
                            className="flex items-center text-teal-600 hover:text-teal-800 font-medium">
                            Read More <FaChevronRight className="ml-2" />
                        </button>
                    </div>
                    {/* Goat Care Guide */}
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
                        <img src={goat} alt="Goat" className="w-full h-40 object-cover rounded-t-lg mb-4" />
                        <h3 className="text-xl font-semibold mb-4 text-teal-800">Goat Care Guide</h3>
                        <p className="text-gray-600 mb-4 text-md">Explore tips and guidelines for caring for goats effectively, including their diet, shelter needs, and common health issues.</p>
                        <button
                            onClick={() => openModal('Goat Care Guide Details')}
                            className="flex items-center text-teal-600 hover:text-teal-800 font-medium">
                            Read More <FaChevronRight className="ml-2" />
                        </button>
                    </div>
                    {/* Camel Care Guide */}
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
                        <img src={cam} alt="Camel" className="w-full h-40 object-cover rounded-t-lg mb-4" />
                        <h3 className="text-xl font-semibold mb-4 text-teal-800">Camel Care Guide</h3>
                        <p className="text-gray-600 mb-4 text-md">Get insights into the best practices for camel care, including feeding, housing, and health considerations.</p>
                        <button
                            onClick={() => openModal('Camel Care Guide Details')}
                            className="flex items-center text-teal-600 hover:text-teal-800 font-medium">
                            Read More <FaChevronRight className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                            &times;
                        </button>
                        <h3 className="text-2xl font-semibold mb-4">{modalContent}</h3>
                        <p className="text-gray-700">Detailed information about {modalContent} goes here. This section provides comprehensive insights into the care practices, tips, and recommendations for the selected animal.</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Content;
