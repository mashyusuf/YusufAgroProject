import { useEffect, useState } from 'react';
import SectionTitle from '../../../../componenets/SectionTitle/SectionTitle';
import DiscountItem from './DiscountItem';



const PopularAnimal = () => {
  const [discounts, setDiscounts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('all.json')
        const data = await res.json();
        const discountItems = data.filter(anything => anything.discount > 0);
        setDiscounts(discountItems)
        //const response = await fetch('all.json');
       // const data = await response.json();
        //const discountItems = data.filter(item => item.discount > 0); 
        //setDiscounts(discountItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewMore = () => {
    setShowAll(true);
  };

  return (
    <div className='mt-16 mb-10'>
      <SectionTitle heading="Discover Our Discount Animals" subHeading="Yusuf Agro - Quality You Can Trust" />
      <div className='container mx-auto mt-10'>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discounts.slice(0, showAll ? discounts.length : 6).map(item => (
          <DiscountItem key={item.id} item={item} />
        ))}
      </div>
      </div>
     <div className='text-center mt-10'>
     {!showAll && (
        <button
        className="bg-gradient-to-r  from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-500 hover:to-green-400 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        onClick={handleViewMore}
      >
        View More
      </button>
      
      )}
     </div>
    </div>
  );
};

export default PopularAnimal;
