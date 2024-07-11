import { Link, useParams } from "react-router-dom";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRight, FaInfoCircle } from "react-icons/fa";

const CategoryCard = () => {
    const { category } = useParams();
  
    const axiosCommon = useAxiosCommon();

    const { data: allAnimal = [] } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const res = await axiosCommon.get(`/allanimal/${category}`);
            return res.data;
        }
    });
    
    console.log(allAnimal);

    return (
        <div className="py-8 bg-gray-100 dark:bg-gray-900">
            <h2 className="text-4xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-400">
                Animals in {category}
            </h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
                {allAnimal.map(item => (
                    <div key={item._id} className="bg-gradient-to-r from-sky-300 to-green-300 dark:from-sky-700 dark:to-green-800 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
                        <img src={item.image} alt={item.name} className="w-full h-72 object-cover object-center rounded-t-lg" />
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2 flex items-center">
                                {item.name} <FaInfoCircle className="ml-2 text-yellow-400" />
                            </h3>
                            <p className="text-md text-gray-800 dark:text-gray-300 mb-4">
                                {item.description}
                            </p>
                            <p className="text-md text-gray-800 dark:text-gray-300 mb-2">
                                Age: <span className="text-xl font-bold text-gray-900 dark:text-white">{item.age}</span>
                            </p>
                            <p className="text-md text-gray-800 dark:text-gray-300 mb-2">
                                Price: <span className="text-xl font-bold text-gray-900 dark:text-white">{item.price}</span>
                            </p>
                            <p className="text-md text-gray-800 dark:text-gray-300 mb-2">
                                Discount: <span className="text-xl font-bold text-gray-900 dark:text-white">{item.discount}</span>
                            </p>
                            <p className="text-md text-gray-800 dark:text-gray-300 mb-4">
                                Farm Name: <span className="text-xl font-bold text-gray-900 dark:text-white">{item.farm_name}</span>
                            </p>
                            <p className="text-md text-gray-800 dark:text-gray-300 mb-4">
                                Owner Name: <span className="text-xl font-bold text-gray-900 dark:text-white">{item.owner_name}</span>
                            </p>
                            <p className="text-md text-gray-800 dark:text-gray-300 mb-4">
                                Country: <span className="text-xl font-bold text-gray-900 dark:text-white">{item.country}</span>
                            </p>
                            <Link to={`/cardDetails/${item._id}`}>
                                <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center">
                                    See Details <FaArrowRight className="ml-2" />
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCard;
