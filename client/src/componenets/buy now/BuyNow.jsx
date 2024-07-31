import { useEffect, useState } from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useParams } from "react-router-dom";
import { FiClock, FiDollarSign, FiMapPin, FiUser, FiFlag, FiPercent, FiAlignLeft } from "react-icons/fi";
import { Helmet } from 'react-helmet-async';
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineHome, AiOutlineCalendar, AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';
import {  GiCow } from 'react-icons/gi';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import cow from '../../assets/cow.gif';
import { MdDone } from 'react-icons/md'; // Importing the 'done' icon
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
Modal.setAppElement('#root');
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from '../checkoutForm/CheckOutForm';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const BuyNow = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [dateTime, setDateTime] = useState(''); 
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: buy = {} } = useQuery({
        queryKey: ['buy', id],
        queryFn: async () => {
            const res = await axiosCommon.get(`/buy-details/${id}`);
            return res.data;
        },
    });

    useEffect(() => {
        const currentDateTime = new Date().toISOString().slice(0, 16);
        setDateTime(currentDateTime);
    }, []);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const openModal2 = () => setModalIsOpen2(true);
    const closeModal2 = () => setModalIsOpen2(false);

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
            const { data } = await axiosSecure.post(`/buy-now`, buyData);
            return data;
        },
        onSuccess: () => {
            navigate('/purchase');
            setLoading(false);
        },
    });

    const handleConfirmPurchase = async (e) => {
        e.preventDefault();

        if (!name || !phoneNumber || !dateTime) {
            toast.error('Please fill out all required fields.');
            return;
        }

        setLoading(true);

        try {
            const purchaseData = {
                name,
                email: user?.email,
                phone: phoneNumber,
                address: buy.address, // Ensure this is correct based on your data structure
                image: buy.image,
                dateTime,
                buy,
            };

            await mutateAsync(purchaseData);

            toast.success('Your purchase has been successfully completed!');
            setIsBooked(true);
            closeModal2();
        } catch (err) {
            console.error(err);
            toast.error('Failed to complete the purchase. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    };

      // Calculate the discounted price
      const discountedPrice = buy.price - (buy.price * (buy.discount / 100));

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
                            <span className="font-bold text-green-600  text-4xl ml-2">
                                ${discountedPrice.toFixed(2)} 
                                {buy.discount > 0 && (
                                    <span className="line-through text-red-500 ml-2">${buy.price}</span>
                                )}
                            </span>
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
                        <div className="flex items-center text-lg">
                            <FiPercent className="mr-2 text-2xl text-pink-500" />
                            <span>Available Now</span>
                            <span className="font-bold text-red-700 ml-2">{buy.status}</span>
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
                            value={user?.email}
                            readOnly
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                            required
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
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={buy.address}
                            onChange={(e)=> setAddress(e.target.value)}
                            placeholder="Enter your address"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                            required
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-500">
                            <AiOutlineCalendar />
                        </span>
                        <input
                            type="datetime-local"
                            id="datetime"
                            name="datetime"
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                            placeholder="Select date and time"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                            required
                        />
                    </div>
                    <button
  type="submit"
  onClick={openModal2}
  className={`flex items-center justify-center gap-2 px-6 py-3 mt-4 text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full shadow-lg transform transition-transform hover:scale-110 hover:shadow-xl focus:outline-none ${loading || buy.status === 'sold out' ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={loading || buy.status === 'sold out'}
>
  <GiCow className="w-6 h-6" /> Submit Now
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
        <div className="flex justify-end">
            <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <AiOutlineClose className="text-2xl" />
            </button>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Book Your Item</h2>
        <form onSubmit={handleBooking} className="space-y-4">
            {/* Your booking form */}
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
                    <AiOutlineCalendar />
                </span>
                <input
                    type="datetime-local"
                    id="datetime"
                    name="datetime"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                    required
                />
            </div>
            <button
                type="submit"
                className={`btn btn-primary w-full p-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading }
            >
                {loading ? 'Booking...' : 'Book Now'}
            </button>
        </form>
    </div>
</Modal>

<Modal
    isOpen={modalIsOpen2}
    onRequestClose={closeModal2}
    contentLabel="Booking Confirmation"
    className="w-full max-w-md sm:max-w-lg lg:max-w-xl p-6 bg-white rounded-lg shadow-md mx-auto my-20 relative overflow-y-auto"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
>
    <div className="w-full p-2 bg-white rounded-lg shadow-md mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-center">Purchase Confirmation</h2>
        <p className="mb-2 text-center">Are you sure you want to Purchase {buy.name}?</p>
        <div >
            <div className="mb-2">
                <label className=" flex space-x-2 text-gray-700"> <AiOutlineUser className="mr-2 text-xl text-gray-500" />Name: <span className='text-md'>{name}</span></label> 
            </div>
            <div className="mb-2">
                <label className=" flex space-x-2  text-gray-700">  <AiOutlineMail className="mr-2 text-xl text-gray-500" />Email: <span className='text-md'>{user?.email}</span></label> 
                    
               
            </div>
            <div className="mb-2">
                <label className=" flex space-x-2  text-gray-700"><AiOutlinePhone className="mr-2 text-xl text-gray-500" />Phone: <span>{phoneNumber}</span></label>  

            </div>
            <div className="mb-2">
                <label className="flex space-x-2  text-gray-700">  <AiOutlineHome className="mr-2 text-xl text-gray-500" />Address:  <span>{address}</span></label>
                   
            </div>
            <div className="mb-2">
                <label className="flex space-x-2  text-gray-700">  <AiOutlineCalendar className="mr-2 text-xl text-gray-500" />Booking Date and Time: <span>{new Date(dateTime).toLocaleString()}</span></label>
                    
            </div>
            <div className="mb-2">
                <label className="block text-center text-gray-700">Card Details:</label>
                <div className="flex items-center justify-between">
                    <img src={buy.image} alt={buy.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                    <div>
                        <h1 className="text-indigo-800 text-xl mb-2 font-bold">{buy.name}</h1>
                        <div className="flex justify-between items-center space-x-4">
                            <span>Age:</span>
                            <span className="font-bold ml-2">{buy.age}</span>
                            <div className="flex items-center text-lg">
                            <FiDollarSign className="mr-2 text-2xl text-green-500" />
                            <span>Price:</span>
                            <span className="font-bold text-green-600  ml-2">
                                ${discountedPrice.toFixed(2)} 
                                {buy.discount > 0 && (
                                    <span className="line-through text-red-500 ml-2">${buy.price}</span>
                                )}
                            </span>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <Elements stripe={stripePromise}>
                <CheckOutForm closeModal2={closeModal2} loading={loading}  discountedPrice={discountedPrice} buy={buy} />
            </Elements>
           
        </div>
    </div>
</Modal>
        </div>
    );
}


export default BuyNow;
