import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Salestable = () => {
    const [sales, setSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [salesPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [editId, setEditid] = useState('');
    const [editedpurchaseid, setEditedpurchaseid] = useState('');
    const [editedsaledate, setEditedsaledate] = useState('');
    const [editedsaleamount, setEditedsaleamount] = useState('');

    const componentRef = useRef();

    const fetchSales = async () => {
        try {
            const res = await axios.get("http://localhost:3000/sales");
            setSales(res.data.Result);
        } catch (error) {
            console.error("Error fetching sales:", error);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'List_of_Sales',
    });

    const handleEdit = (sale_id, sale_purchase_id, sale_sale_date, sale_sale_amount) => {
        setEditid(sale_id);
        setEditedpurchaseid(sale_purchase_id);
        setEditedsaledate(sale_sale_date);
        setEditedsaleamount(sale_sale_amount);
    };

    const handleUpdate = async(sale_id) => {
        try {
            await axios.put(`http://localhost:3000/sales/${sale_id}`, {
                purchase_id: editedpurchaseid,
                sale_date: editedsaledate,
                sale_amount: editedsaleamount,
            });
            setEditid(''); // Exit edit mode after update
            fetchSales(); // Refresh shoe list after update
        } catch (error) {
            console.error("Error updating shoe detail:", error);
        }
    };

    const handleDelete = async(sale_id) => {
        try {
            await axios.delete(`http://localhost:3000/sales/${sale_id}`);
            fetchSales(); // Refresh shoe list after deletion
        } catch (error) {
            console.error("Error deleting shoe:", error);
        }
    };

    // Filter sales based on search query
    const filteredSales = sales.filter(sale => {
        return sale.sale_id.toString().includes(search) ||
            sale.purchase_id.toString().includes(search) ||
            sale.sale_date.includes(search) ||
            sale.sale_amount.toString().includes(search);
    });


    // Get current sales for the current page
    const indexOfLastSale = currentPage * salesPerPage;
    const indexOfFirstSale = indexOfLastSale - salesPerPage;
    const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className="overflow-x-hidden w-full mt-5">
            <input
                className='border border-gray-800 px-4 py-2 w-full rounded-lg'
                placeholder='Search Sales'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="" ref={componentRef}>
                <h2 className="text-2xl font-semibold mb-4 text-center mt-3">List of Sales</h2>
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Sale ID</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Purchase ID</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Sale Date</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Sale Amount</th>
                            <th className="py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSales.map((sale, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="px-6 py-4 border border-gray-300 text-center">{sale.sale_id}</td>
                                <td className="px-6 py-4 border border-gray-300 text-center">
                                {editId === sale.sale_id ? (
                                        <input 
                                            type="number" 
                                            value={editedpurchaseid} 
                                            onChange={(e) => setEditedpurchaseid (e.target.value)} 
                                            className="w-full"
                                        />
                                    ) : (
                                        sale.purchase_id
                                    )}
                                    </td>
                                <td className="px-6 py-4 border border-gray-300 text-center">
                                {editId === sale.sale_id ? (
                                        <input 
                                            type="date" 
                                            value={editedsaledate} 
                                            onChange={(e) => setEditedsaledate (e.target.value)} 
                                            className="w-full"
                                        />
                                    ) : (
                                        sale.sale_date
                                    )}
                                </td>
                                <td className="px-6 py-4 border border-gray-300 text-center">
                                {editId === sale.sale_id ? (
                                        <input 
                                            type="number" 
                                            value={editedsaleamount} 
                                            onChange={(e) => setEditedsaleamount (e.target.value)} 
                                            className="w-full"
                                        />
                                    ) : (
                                        sale.sale_amount
                                    )}
                                </td>
                                <td className="border flex justify-between">
                                    {editId === sale.sale_id ? (
                                        <button className="px-6 py-3 justify-center" onClick={() => handleUpdate(sale.sale_id)}>Update</button>
                                    ) : (
                                        <>
                                            <button 
                                                className='border p-3 px-3 -mr-4 hover:bg-gray-800 hover:text-white' 
                                                onClick={() => handleEdit(sale.sale_id, sale.purchase_id, sale.sale_date, sale.sale_amount)}>
                                                <FaEdit className='w-7 h-7' />
                                            </button>
                                            <button 
                                                className='border border-gray-300 p-3 px-3 -ml-3 hover:bg-gray-800 hover:text-white' 
                                                onClick={() => handleDelete(sale.sale_id)}>
                                                <MdDelete className='w-7 h-7' />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mx-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md">
                    Previous
                </button>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastSale >= filteredSales.length}
                    className="mx-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md">
                    Next
                </button>
            </div>
            <div className="flex justify-center items-center">
                <button className='flex justify-center items-center hover:bg-gray-800 bg-gray-300 text-black hover:text-white font-bold py-2 px-4 rounded mt-4' onClick={handlePrint}>
                    Generate PDF
                </button>
            </div>
        </div>
    );
};

export default Salestable;
