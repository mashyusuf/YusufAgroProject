import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaCalendarAlt, FaMoneyCheckAlt, FaCheckCircle, FaTruck, FaFilePdf, FaFileExcel } from 'react-icons/fa';
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const MyPurchase = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: purchase = [], isLoading } = useQuery({
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
                icon.classList.add("animate-bounce", "text-blue-500");
            }
        });
    }, [purchase]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Sales Report", 20, 20);
        doc.autoTable({
            head: [['#', 'Image', 'Name', 'Date And Time', 'Transaction Id', 'Deliver']],
            body: purchase.map((item, index) => [
                index + 1,
                '', // Image can't be included directly in PDF using jsPDF
                item.name,
                new Date(item.date).toLocaleString(),
                item.transactionId,
                item.delivery
            ]),
        });
        doc.save('sales_report.pdf');
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(purchase.map((item, index) => ({
            '#': index + 1,
            'Name': item.name,
            'Date And Time': new Date(item.date).toLocaleString(),
            'Transaction Id': item.transactionId,
            'Deliver': item.delivery,
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Report');
        XLSX.writeFile(workbook, 'sales_report.xlsx');
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">
            <span className="loading text-9xl loading-spinner text-info"></span>
        </div>
    }

    return (
        <div className="p-4">
            <Helmet>
                <title>Yusuf's Agro | My Purchase</title>
            </Helmet>
            <h1 className="text-3xl text-center font-bold mb-6 text-gradient">Total Purchases: {purchase.length}</h1>

            <div className="flex justify-end gap-4 mb-4">
                <button onClick={downloadPDF} className="btn btn-red">
                    <FaFilePdf className="mr-2" /> Download PDF
                </button>
                <button onClick={downloadExcel} className="btn btn-green">
                    <FaFileExcel className="mr-2" /> Download Excel
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table-auto w-full text-center">
                    <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Date And Time</th>
                            <th className="px-4 py-3">Transaction Id</th>
                            <th className="px-4 py-3">Deliver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchase.map((item, index) => (
                            <tr key={item.id || index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} hover:bg-gradient-to-r from-green-100 to-blue-100 transition duration-300 ease-in-out`}>
                                <td className="px-4 py-2 font-bold text-xl">{index + 1}</td>
                                <td className="px-4 py-2">
                                    <div className="flex justify-center items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-14 w-14">
                                                <img src={item.image} alt="Animal" className="object-cover w-full h-full" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-2 font-bold text-xl">{item.name}</td>
                                <td className="px-4 py-2 flex justify-center items-center gap-2">
                                    <FaCalendarAlt className="text-blue-500" />
                                    {new Date(item.date).toLocaleString()}
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex justify-center items-center gap-2">
                                        <FaMoneyCheckAlt className="text-green-500" />
                                        {item.transactionId}
                                    </div>
                                </td>
                                <td className="px-4 py-2 flex justify-center items-center gap-2 mt-2">
                                    {item.delivery === "On The Way" ? (
                                        <>
                                            <FaTruck className="text-2xl car-icon text-blue-500" data-delivery={item.delivery} />
                                            <span className="font-bold text-xl text-blue-500">{item.delivery}</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaCheckCircle className="text-2xl text-green-500" />
                                            <span className="font-bold text-xl text-green-500">Delivery Successful</span>
                                        </>
                                    )}
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
