import useAxiosCommon from '../../../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar } from 'react-icons/fa';

const Category = () => {
    const axiosCommon = useAxiosCommon();
    
    const { data: allCategory = [] } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const res = await axiosCommon.get('/category');
            return res.data;
        }
    });

    console.log(allCategory);

    return (
        <div>
            <div className='grid md:grid-cols-3 lg:grid-cols-3 max-w-7xl mx-auto gap-8'>
                {allCategory.map(item => (
                    <Link to={`/categoryCard/${item.category}`} key={item._id} className="max-w-lg p-6 shadow-lg bg-gradient-to-r from-sky-400 to-green-400 rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105">
                        <div className="flex justify-between pb-4 border-b border-gray-200">
                            <div className="flex items-center">
                                <p className="text-xl font-semibold capitalize text-white">{item.name}</p>
                                <FaStar className="ml-2 text-yellow-300" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <img src={item.image} alt="" className="w-full h-72 object-cover object-center rounded-md" />
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <h3 className="text-2xl font-semibold text-white">{item.category}</h3>
                            <FaArrowRight className="text-white" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Category;


