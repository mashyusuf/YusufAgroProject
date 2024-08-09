import  { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaUser, FaPhone, FaCommentDots } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { TailSpin } from 'react-loader-spinner';

const ContactUs = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            Swal.fire({
                title: 'Success!',
                text: 'Your message has been sent successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }, 2000);
    };

    return (
        <section className="bg-gradient-to-r from-sky-300 max-w-7xl mx-auto rounded-md mt-10 mb-10 to-sky-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-teal-800">Contact Us</h2>
                <p className="text-center mb-12 text-gray-700">We'd love to hear from you! Please fill out the form below and we'll get in touch with you shortly.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="flex flex-col items-center">
                        <FaMapMarkerAlt className="text-4xl text-teal-800 mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-teal-900">ADDRESS</h3>
                        <p className="text-gray-600">Mohammadpur , Dhaka </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <FaPhoneAlt className="text-4xl text-teal-800 mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-teal-900">PHONE</h3>
                        <p className="text-gray-600">+8801729804092</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <FaEnvelope className="text-4xl text-teal-800 mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-teal-900">EMAIL</h3>
                        <p className="text-gray-600">yusufmash563@gmail.com</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Your Name
                        </label>
                        <div className="relative">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-yellow-100"
                                id="name"
                                type="text"
                                placeholder="Your Name"
                                required
                            />
                            <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
                            Your Number
                        </label>
                        <div className="relative">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-yellow-100"
                                id="number"
                                type="text"
                                placeholder="Your Number"
                                required
                            />
                            <FaPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Your Message
                        </label>
                        <div className="relative">
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-yellow-100"
                                id="message"
                                rows="4"
                                placeholder="Your Message"
                                required
                            ></textarea>
                            <FaCommentDots className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="flex">
    <button
        className="bg-teal-700 w-full text-center hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
        type="submit"
        disabled={isSubmitting}
    >
        {isSubmitting ? (
            <TailSpin height={20} width={20} color="#fff" ariaLabel="loading" />
        ) : (
            <>
                <FaPaperPlane className="mr-2" />
                Send
            </>
        )}
    </button>
</div>

                </form>
            </div>
        </section>
    );
};

export default ContactUs;
