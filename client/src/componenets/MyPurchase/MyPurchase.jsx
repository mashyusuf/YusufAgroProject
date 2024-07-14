import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

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

    return (
        <div>
            yooooo : {purchase.length}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Date And Time</th>
                            <th>Transaction Id</th>
                            <th>Deliver </th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchase.map((item, index) => (
                            <tr key={item.id || index}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={item.buy?.image} alt="Avatar" />
                                            </div>
                                            
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h1>{item.name}</h1>
                                </td>
                                <td>{item.date}</td>
                                <td>{item.id}</td>
                                <td>{item.status}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPurchase;
