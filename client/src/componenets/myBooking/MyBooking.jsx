import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaClock, FaTrash } from "react-icons/fa";
import { MdEmail, MdPhone, MdPerson, MdPendingActions } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const MyBooking = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: bookingItem = [], isError, error, isLoading } = useQuery({
        queryKey: ['purchase', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/bookingItem/${user.email}`);
            return res.data;
        },
        onError: (error) => {
            console.error('Error fetching booking items:', error);
        },
    });

    const mutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/bookingItemDelete/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['purchase', user?.email]);
        },
        onError: (error) => {
            console.error('Error deleting booking item:', error);
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to recover this booking!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleting...',
                    text: 'Please wait.',
                    icon: 'info',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                mutation.mutate(id);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your booking has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            }
        });
    };

    if (isError) {
        return <div className="text-red-500 text-xl text-center">Error: {error.message}</div>;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading text-4xl loading-spinner text-info"></span>
            </div>
        );
    }

    return (
        <div className="p-6">
            <Helmet>
                <title>Yusuf's Agro | My Booking</title>
            </Helmet>
            <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">My Bookings ({bookingItem.length})</h1>
            <div className="overflow-x-auto shadow-md rounded-lg border border-gray-300">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                <MdPerson className="inline-block mr-2 text-lg" /> Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                <MdEmail className="inline-block mr-2 text-lg" /> Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                <MdPhone className="inline-block mr-2 text-lg" /> Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                <BsCalendarDate className="inline-block mr-2 text-lg" /> Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {bookingItem.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-100 transition duration-200 ease-in-out">
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                    <img src={item.buy.image} alt={item.buy.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                                    <span>{item.name}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(item.date).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.buy.request === 'pending' ? (
                                        <div className="flex items-center text-green-500">
                                            <MdPendingActions className="text-lg mr-2 animate-pulse" />
                                            
                                        </div> 
                                    ) : (
                                        <div className="flex items-center text-yellow-500">
                                            <FaClock className="text-lg mr-2" />
                                            {item.buy.request}Request Pending 
                                           
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-red-600 transition"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        <FaTrash className="mr-2" /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBooking;
