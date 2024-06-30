import PropTypes from 'prop-types';

const DiscountItem = ({ item }) => {
  const { name, price, country, image, age, description } = item; 

  return (
    <div className="bg-gradient-to-r from-green-200 to-blue-200 rounded-lg shadow-lg overflow-hidden flex items-center space-x-4 p-6">
      <img className="w-24 h-24 object-cover rounded-full" src={image} alt={name} />
      <div>
        <h3 className="text-2xl font-bold text-blue-800">{name}</h3>
        <p className="text-lg font-bold text-green-800">{country}</p>
        <p className="text-md font-bold text-blue-700 mt-1">{description}</p>
        <p className="text-md font-bold text-green-700 mt-1">Age: {age} years</p>
        <div className="flex items-center mt-2">
          <p className="text-xl font-bold text-yellow-600">${price}</p>
          <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-transform transform hover:scale-105">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

DiscountItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default DiscountItem;
