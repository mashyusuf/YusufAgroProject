import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaCar } from 'react-icons/fa';
import { useEffect } from "react";

const MyPurchase = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: purchase = [] } = useQuery({
        queryKey: ['purchase'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myPurchase/${user?.email}`);
            return res.data;
        },
    });

    useEffect(() => {
        const carIcons = document.querySelectorAll(".car-icon");
        carIcons.forEach(icon => {
            if (icon.getAttribute("data-delivery") === "On The Way") {
                icon.classList.add("animate-bounce", "text-yellow-500");
            }
        });
    }, [purchase]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Total Purchases:{purchase.length}</h1>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table-auto w-full text-left">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Date And Time</th>
                            <th className="px-4 py-2">Transaction Id</th>
                            <th className="px-4 py-2">Deliver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchase.map((item, index) => (
                            <tr key={item.id || index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                                <td className="border px-4 py-2 font-bold text-xl">{index + 1}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={item.buy?.image} alt="Avatar" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="border px-4 py-2 font-bold text-xl">{item.name}</td>
                                <td className="border px-4 py-2">{item.date}</td>
                                <td className="border px-4 py-2">{item.id}</td>
                                <td className="border px-4 py-2 flex items-center">
                                    <FaCar className={`text-xl mr-2 car-icon`} data-delivery={item.delivery} /> 
                                    <span className="font-bold text-xl">{item.delivery}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPurchase;
