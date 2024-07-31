import PropTypes from 'prop-types'; // Import PropTypes
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import './CheckOutForm.css';
import { FaSpinner } from 'react-icons/fa';
import { GiCow } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const CheckOutForm = ({ closeModal2, loading, buy, discountedPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (buy?.price && buy?.price > 1) {
      getClientSecret({ price: discountedPrice });
    }
  }, [discountedPrice]);

  // Get Client Secret
  const getClientSecret = async ({ price }) => {
    const { data } = await axiosSecure.post('/create-payment-intent', { price });
    console.log('Client secret:', data);
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setCardError('');
    }

    // Handle successful payment method creation here
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email,
          name: user?.displayName,
        },
      },
    });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      console.log(paymentIntent);
      const paymentInfo = {
        ...buy,
        transactionId: paymentIntent.id,
        animalId: buy._id,
        date: new Date(),
      };
      delete paymentInfo._id;
      console.log(paymentInfo);

      try {
        const response = await axiosSecure.post('buyNow', paymentInfo);
        console.log('Purchase response:', response.data);
      } catch (error) {
        console.log('Purchase error:', error);
      }
    
    }
    setProcessing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <div className="flex justify-around mt-4 space-x-4">
          <button
            type="submit"
            className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 hover:from-blue-600 hover:to-blue-700 transition duration-300 transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!stripe || !clientSecret || processing}
          >
            {processing ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <GiCow className="mr-2" />
            )}
            <span>
              {processing ? 'Processing...' : `Confirm Purchase $${discountedPrice.toFixed(2)} `}
              {buy.discount > 0 && (
                <span className="line-through text-red-500 ml-2">${buy.price}</span>
              )}
            </span>
          </button>
          <button
            type="button"
            onClick={closeModal2}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-400 transition duration-300 transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </form>
      {cardError && <p className='text-red-600 font-bold'>{cardError}</p>}
    </>
  );
};

// Define PropTypes
CheckOutForm.propTypes = {
  closeModal2: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  buy: PropTypes.shape({
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
  }).isRequired,
  discountedPrice: PropTypes.number.isRequired,
};

export default CheckOutForm;
