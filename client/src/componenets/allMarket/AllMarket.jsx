import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Helmet } from 'react-helmet-async';
import { useState } from "react";
import { FiEye, FiX, FiArrowDown, FiArrowUp, FiShoppingCart, FiArrowLeft, FiArrowRight, FiDollarSign, FiClock, FiMapPin, FiUser, FiFlag, FiPercent } from "react-icons/fi";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";

const AllMarket = () => {
    const axiosCommon = useAxiosCommon();
    const [selectedItem, setSelectedItem] = useState(null);
    const [sortType, setSortType] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const { data: allData = [] } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const res = await axiosCommon.get('all');
            return res.data;
        }
    });

    const sortedData = (() => {
        if (sortType === 'asc') {
            return [...allData].sort((a, b) => a.price - b.price);
        } else if (sortType === 'desc') {
            return [...allData].sort((a, b) => b.price - a.price);
        } else {
            return allData;
        }
    })();

    const handleOpenModal = (item) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const startIndex = currentPage * itemsPerPage;
    const pageCount = Math.ceil(sortedData.length / itemsPerPage);
    const currentPageData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            <Helmet>
                <title>Item House | Shop House</title>
            </Helmet>
            <h1 className="text-3xl font-bold text-center my-8">Currently Available Animals: {allData.length}</h1>
            <div className="flex flex-col md:flex-row justify-evenly items-center mb-10 space-y-4 md:space-y-0">
                <button
                    onClick={() => setSortType(sortType === 'asc' ? 'desc' : 'asc')}
                    className="text-xl px-6 py-3 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-300 w-full md:w-auto flex items-center justify-center"
                >
                    {sortType === 'asc' ? <><FiArrowUp className="mr-2" /> PRICE: LOW TO HIGH</> : <><FiArrowDown className="mr-2" /> PRICE: HIGH TO LOW</>}
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto p-4">
                {currentPageData.map(item => (
                    <div key={item._id} className="card bg-gradient-to-br from-sky-100 to-green-100 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                        <figure className="relative">
                            <img className="w-full h-72 object-cover" src={item.image} alt={item.name} />
                        </figure>
                        <div className="card-body p-6">
                            <h2 className="card-title text-2xl font-bold text-indigo-700 mb-4">{item.name}</h2>
                            <div className="flex flex-col gap-2">
                                <p className="flex items-center text-lg"><FiClock className="mr-2 text-xl text-blue-500" />Age: <span className="font-bold ml-2">{item.age}</span></p>
                                <p className="flex items-center text-lg"><FiDollarSign className="mr-2 text-xl text-green-500" />Price: <span className="font-bold ml-2">${item.price}</span></p>
                                <p className="flex items-center text-lg"><FiMapPin className="mr-2 text-xl text-yellow-500" />Farm Name: <span className="font-bold ml-2">{item.farm_name}</span></p>
                                <p className="flex items-center text-lg"><FiUser className="mr-2 text-xl text-orange-500" />Owner Name: <span className="font-bold ml-2">{item.owner_name}</span></p>
                                <p className="flex items-center text-lg"><FiFlag className="mr-2 text-xl text-red-500" />Country: <span className="font-bold ml-2">{item.country}</span></p>
                                <p className="flex items-center text-lg"><FiPercent className="mr-2 text-xl text-pink-500" />Discount: <span className="font-bold ml-2">{item.discount}%</span></p>
                            </div>
                            <div className="card-actions justify-between mt-4">
                                <button onClick={() => handleOpenModal(item)} className="btn btn-primary bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300 flex items-center">
                                    <FiEye className="mr-2" /> View
                                </button>
                                <Link to={`/buyNow/${item._id}`}> 
                                    <button className="btn btn-primary bg-emerald-500 border-0 text-white px-4 py-2 rounded hover:bg-sky-500 transition duration-300 flex items-center">
                                        <FiShoppingCart className="mr-2" /> Book Now / Buy Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8 mb-10">
                <ReactPaginate
                    previousLabel={<FiArrowLeft className="text-white mx-2 my-1" />}
                    nextLabel={<FiArrowRight className="text-white mx-2 my-1" />}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination flex justify-center items-center space-x-3'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link bg-sky-500 hover:bg-sky-700 text-white px-4 py-3 rounded transition-colors duration-300'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link bg-green-500 hover:bg-green-700 text-white px-4 py-3 rounded transition-colors duration-300'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link bg-green-500 hover:bg-green-700 text-white px-4 py-3 rounded transition-colors duration-300'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-3 rounded transition-colors duration-300'}
                    activeClassName={'active'}
                    activeLinkClassName={'bg-indigo-600 text-white px-4 py-3 rounded'}
                />
            </div>
            {selectedItem && (
                <div className="fixed inset-0 flex mt-20 items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 max-w-lg mx-auto rounded-lg relative">
                        <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                            <FiX size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{selectedItem.name}</h2>
                        <img className="w-full h-72 object-cover mb-4" src={selectedItem.image} alt={selectedItem.name} />
                        <p className="text-lg"><span className="font-semibold text-indigo-700">Age:</span> {selectedItem.age}</p>
                        <p className="text-lg"><span className="font-semibold text-indigo-700">Price:</span> {selectedItem.price}</p>
                        <p className="text-lg"><span className="font-semibold text-indigo-700">Farm Name:</span> {selectedItem.farm_name}</p>
                        <p className="text-lg"><span className="font-semibold text-indigo-700">Owner Name:</span> {selectedItem.owner_name}</p>
                        <p className="text-lg"><span className="font-semibold text-indigo-700">Country:</span> {selectedItem.country}</p>
                        <p className="text-lg"><span className="font-semibold text-indigo-700">Discount:</span> {selectedItem.discount}%</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllMarket;
