import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { SiHappycow } from 'react-icons/si';
import { GiGoat, GiCamelHead, GiBuffaloHead } from 'react-icons/gi';

// Icons for different types of reviews
const icons = {
    cow: <SiHappycow className="text-green-500 text-3xl" />,
    goat: <GiGoat className="text-yellow-500 text-3xl" />,
    buffalo: <GiBuffaloHead className="text-red-500 text-3xl" />,
    camel: <GiCamelHead className="text-blue-500 text-3xl" />,
};

// Sample review data
const fakeReviews = [
    { id: 1, user: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', rating: 4.5, review: 'Excellent service and quality products.', type: 'cow' },
    { id: 2, user: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', rating: 5, review: 'Very satisfied with the purchase!', type: 'goat' },
    { id: 3, user: 'Michael Brown', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', rating: 4, review: 'Good value for money.', type: 'buffalo' },
    { id: 4, user: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', rating: 3.5, review: 'The product is good, but delivery was delayed.', type: 'camel' },
    { id: 5, user: 'Sarah Wilson', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', rating: 4, review: 'Very helpful customer service.', type: 'cow' },
    { id: 6, user: 'David Lee', avatar: 'https://randomuser.me/api/portraits/men/6.jpg', rating: 4.5, review: 'High-quality items, will buy again.', type: 'goat' },
    { id: 7, user: 'Anna Kim', avatar: 'https://randomuser.me/api/portraits/women/7.jpg', rating: 5, review: 'Amazing experience, highly recommended!', type: 'buffalo' },
    { id: 8, user: 'Chris Johnson', avatar: 'https://randomuser.me/api/portraits/men/8.jpg', rating: 3, review: 'Product is decent but needs improvement.', type: 'camel' },
    { id: 9, user: 'Laura Martinez', avatar: 'https://randomuser.me/api/portraits/women/9.jpg', rating: 4, review: 'Good quality, but shipping was slow.', type: 'cow' },
    { id: 10, user: 'James Taylor', avatar: 'https://randomuser.me/api/portraits/men/10.jpg', rating: 4.5, review: 'Great value and fast delivery.', type: 'goat' },
    { id: 11, user: 'Olivia Moore', avatar: 'https://randomuser.me/api/portraits/women/11.jpg', rating: 5, review: 'Fantastic products and excellent service.', type: 'buffalo' },
    { id: 12, user: 'Daniel Clark', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', rating: 3.5, review: 'Product quality was good, but packaging was poor.', type: 'camel' },
    { id: 13, user: 'Emma White', avatar: 'https://randomuser.me/api/portraits/women/13.jpg', rating: 4, review: 'Reliable service and good products.', type: 'cow' },
    { id: 14, user: 'Liam Hall', avatar: 'https://randomuser.me/api/portraits/men/14.jpg', rating: 4.5, review: 'High-quality items, very satisfied.', type: 'goat' },
    { id: 15, user: 'Mia Adams', avatar: 'https://randomuser.me/api/portraits/women/15.jpg', rating: 5, review: 'Absolutely love the product!', type: 'buffalo' },
    { id: 16, user: 'Noah Nelson', avatar: 'https://randomuser.me/api/portraits/men/16.jpg', rating: 3, review: 'Product is average, not what I expected.', type: 'camel' },
    { id: 17, user: 'Ava Robinson', avatar: 'https://randomuser.me/api/portraits/women/17.jpg', rating: 4, review: 'Good purchase, will consider buying again.', type: 'cow' },
    { id: 18, user: 'Ethan Walker', avatar: 'https://randomuser.me/api/portraits/men/18.jpg', rating: 4.5, review: 'Great quality and service.', type: 'goat' },
    { id: 19, user: 'Sophia Young', avatar: 'https://randomuser.me/api/portraits/women/18.jpg', rating: 5, review: 'Exceeded my expectations.', type: 'buffalo' },
    { id: 20, user: 'Mason Scott', avatar: 'https://randomuser.me/api/portraits/men/19.jpg', rating: 3.5, review: 'The product was okay, but delivery was a bit slow.', type: 'camel' },
];

const ReviewCard = ({ review }) => (
    <div className="bg-white  rounded-lg p-6  shadow-lg border border-gray-200 transform transition-transform hover:scale-105">
        <div className="flex items-center mb-4">
            <img src={review.avatar} alt={review.user} className="h-14 w-14 rounded-full border-2 border-gray-300 mr-4" />
            <div>
                <h3 className="text-xl font-bold text-gray-800">{review.user}</h3>
                <div className="flex items-center mt-1">
                    <span className="text-yellow-500">
                        {[...Array(Math.floor(review.rating))].map((_, index) => (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 fill-current"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 1l2.602 5.777H18l-4.146 3.75L15.79 18 10 14.573 4.21 18l1.936-6.473L2 6.777h5.398L10 1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ))}
                        {[...Array(5 - Math.floor(review.rating))].map((_, index) => (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 fill-current text-gray-300"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 1l2.602 5.777H18l-4.146 3.75L15.79 18 10 14.573 4.21 18l1.936-6.473L2 6.777h5.398L10 1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ))}
                    </span>
                    <span className="ml-2 text-gray-600">({review.rating})</span>
                </div>
                <div className="mt-2 flex items-center text-gray-500">
                    {icons[review.type]} <span className="ml-2">Type: {review.type}</span>
                </div>
            </div>
        </div>
        <p className="text-gray-700 mt-2">{review.review}</p>
    </div>
);

ReviewCard.propTypes = {
    review: PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        review: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
};

const ReviewCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container mt-10 mb-10  mx-auto px-4 py-8">
            <h2 className="text-2xl text-center  font-bold mb-6 text-yellow-500">Customer Reviews</h2>
            <Slider {...settings}>
                {fakeReviews.map((review) => (
                    <div key={review.id} className="p-4">
                        <ReviewCard review={review} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ReviewCarousel;
