import  { useState } from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useParams } from "react-router-dom";
import { FiClock, FiDollarSign, FiMapPin, FiUser, FiFlag, FiPercent, FiAlignLeft } from "react-icons/fi";
import { Helmet } from 'react-helmet-async';
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineHome } from 'react-icons/ai';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import cow from '../../assets/cow.gif';
import { MdDone } from 'react-icons/md'; // Importing the 'done' icon
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
Modal.setAppElement('#root');

const BuyNow = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false)
    const [isBooked, setIsBooked] = useState(false);
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { data: buy = {} } = useQuery({
        queryKey: ['buy', id],
        queryFn: async () => {
            const res = await axiosCommon.get(`/buy-details/${id}`);
            return res.data;
        },
    });

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleBooking = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Booking Done',
            text: 'Your booking has been successfully completed!',
        }).then(() => {
            setIsBooked(true);
            closeModal();
        });
    };

    const { mutateAsync } = useMutation({
        mutationFn: async buyData => {
          const { data } = await axiosSecure.post(`/buy-now`, buyData)
          return data
        },
        onSuccess: () => {
          console.log('Data Saved Successfully')
          toast.success('Room Added Successfully!')
          navigate('/')
          setLoading(false)
        },
      })
    
      //   Form handler
      const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const address = form.address.value
        const phone = form.phone.value
        try {
          const buyData = {
            name,
            email,
            address,
            phone,
          }
          console.table(buyData)
    
          //   Post request to server
          await mutateAsync(buyData)
        } catch (err) {
          console.log(err)
          toast.error(err.message)
          setLoading(false)
        }
      }
    
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 grid place-items-center p-8">
            <Helmet>
                <title>{buy.name ? `${buy.name} - Buy Now` : 'Buy Now'}</title>
            </Helmet>
            <div className="max-w-5xl w-full bg-white shadow-2xl rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                <figure className="relative">
                    <img className="w-full h-96 object-cover" src={buy.image} alt={buy.name} />
                </figure>
                <div className="p-8">
                    <h1 className="text-5xl font-extrabold text-indigo-800 mb-8">{buy.name}</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex items-center text-lg">
                            <FiClock className="mr-2 text-2xl text-blue-500" />
                            <span>Age:</span>
                            <span className="font-bold ml-2">{buy.age}</span>
                        </div>
                        <div className="flex items-center text-lg">
                            <FiDollarSign className="mr-2 text-2xl text-green-500" />
                            <span>Price:</span>
                            <span className="font-bold ml-2">${buy.price}</span>
                        </div>
                        <div className="flex items-center text-lg">
                            <FiMapPin className="mr-2 text-2xl text-yellow-500" />
                            <span>Farm Name:</span>
                            <span className="font-bold ml-2">{buy.farm_name}</span>
                        </div>
                        <div className="flex items-center text-lg">
                            <FiUser className="mr-2 text-2xl text-orange-500" />
                            <span>Owner Name:</span>
                            <span className="font-bold ml-2">{buy.owner_name}</span>
                        </div>
                        <div className="flex items-center text-lg">
                            <FiFlag className="mr-2 text-2xl text-red-500" />
                            <span>Country:</span>
                            <span className="font-bold ml-2">{buy.country}</span>
                        </div>
                        <div className="flex items-center text-lg">
                            <FiPercent className="mr-2 text-2xl text-pink-500" />
                            <span>Discount:</span>
                            <span className="font-bold ml-2">{buy.discount}%</span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-8'>
                        <p className="text-lg flex items-center">
                            <FiAlignLeft className="mr-2 text-xl text-gray-500" />
                            <span className="font-bold mr-2">Description:</span>
                            <span>{buy.description}</span>
                        </p>
                        <button
                            className={`btn btn-outline btn-info text-black flex border-0 text-xl items-center ${isBooked ? ' bg-yellow-400 ' : ''}`}
                            onClick={openModal}
                        >
                            {isBooked ? (
                                <>
                                    <MdDone className="text-white mr-2" /> Booking Done
                                </>
                            ) : (
                                <>
                                    <img src={cow} alt="Cow" className="w-6 h-6 mr-2 animate-pulse" />
                                    Booking Now
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <h1 className='text-4xl font-bold text-sky-500 mt-20'>Please Submit Your Details Here For Buy</h1>
            <div className="w-full max-w-md p-6 bg-rose-200 rounded-lg shadow-md mt-10">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <h1 className='text-xl font-bold text-center'>Give Your All Details Here!</h1>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-500">
                            <AiOutlineUser />
                        </span>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                            required
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-500">
                            <AiOutlineMail />
                        </span>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={user?.email}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-500">
                            <AiOutlinePhone />
                        </span>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                            required
/>

                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-500">
                            <AiOutlineHome />
                        </span>
                        <textarea
                            id="address"
                            name="address"
                            placeholder="Enter your address"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                            rows="3"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Booking Modal"
                className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
            >
                <div className="bg-white p-8 md:p-10 rounded-lg shadow-lg w-full md:max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Book Your Item</h2>
                    <form onSubmit={handleBooking} className="space-y-4">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your phone number"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default BuyNow;
