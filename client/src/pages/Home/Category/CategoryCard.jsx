import { Link, useParams } from "react-router-dom";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const CategoryCard = () => {
    const { category } = useParams();
  
    const axiosCommon = useAxiosCommon();

    const { data: allAnimal = [], isLoading } = useQuery({
        queryKey: ['data', category],
        queryFn: async () => {
            const res = await axiosCommon.get(`/allanimal/${category}`);
            return res.data;
        }
    });
    

    const pageTitle = isLoading ? 'Loading...' : category ? `${category} - Buy Now` : 'Buy Now';

    return (
        <div className="py-8 bg-gray-100 dark:bg-gray-900">
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            <h2 className="text-4xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-400">
                Animals in {category}
            </h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
                {allAnimal.length > 0 ? (
                    allAnimal.map(item => (
                        <div key={item._id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 border border-gray-200 dark:border-gray-700">
                            <img src={item.image} alt={item.name} className="w-full h-60 object-cover object-center rounded-t-lg" />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                    {item.name}
                                </h3>
                                <p className="text-md text-gray-800 dark:text-gray-300 mb-4">
                                    {item.description}
                                </p>
                                <div className="mb-4">
                                    <div className="flex justify-between text-gray-800 dark:text-gray-300 mb-2">
                                        <span className="font-semibold">Age:</span>
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">{item.age}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-800 dark:text-gray-300 mb-2">
                                        <span className="font-semibold">Price:</span>
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">{item.price}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-800 dark:text-gray-300 mb-2">
                                        <span className="font-semibold">Discount:</span>
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">{item.discount}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-800 dark:text-gray-300 mb-2">
                                        <span className="font-semibold">Farm Name:</span>
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">{item.farm_name}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-800 dark:text-gray-300 mb-2">
                                        <span className="font-semibold">Owner Name:</span>
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">{item.owner_name}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-800 dark:text-gray-300 mb-4">
                                        <span className="font-semibold">Country:</span>
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">{item.country}</span>
                                    </div>
                                </div>
                                <Link to={`/buyNow/${item._id}`}>
                                    <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center">
                                        See Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 dark:text-gray-400">No animals found in this category.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryCard;
