import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useReactToPrint } from 'react-to-print';

const Purchasestable = () => {
    const [purchases, setPurchases] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [purchasesPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [editId, setEditId] = useState('');
    const [editedshoeid, setEditedshoeid] = useState('');
    const [editedquantity, setEditedquantity] = useState('');
    const [editedpurchasedate, setEditedpurchasedate] = useState('');

    const componentRef = useRef();

    const fetchpurchases = async () => {
        try {
            const res = await axios.get("http://localhost:3000/purchases");
            setPurchases(res.data.Result);
        } catch (error) {
            console.error("Error fetching purchases:", error);
        }
    };

    useEffect(() => {
        fetchpurchases();
    }, []);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'List_of_Purchases',
    });

    const handleEdit = (purchase_id, shoe_id, quantity, purchase_date) => {
        setEditId(purchase_id);
        setEditedshoeid(shoe_id);
        setEditedquantity(quantity);
        setEditedpurchasedate(purchase_date)
    }

    const handleUpdate = async (purchase_id) => {
        try {
            await axios.put(`http://localhost:3000/purchases/${purchase_id}`, {
                shoe_id: editedshoeid,
                quantity: editedquantity,
                purchase_date: editedpurchasedate
            });
            setEditId(''); // Exit edit mode after update
            fetchpurchases(); // Refresh shoe list after update
        } catch (error) {
            console.error("Error updating purchase record", error)
        }
    }

    const handleDelete = async (purchase_id) => {
        try {
            await axios.delete(`http://localhost:3000/purchases/${purchase_id}`);
            fetchpurchases(); // Refresh shoe list after deletion
        } catch (error) {
            console.error("Error deleting purchase record", error);
        }
    }

    // Filter purchases based on search query
    const filteredPurchases = purchases.filter(purchase => {
        return purchase.purchase_id.toString().includes(search) ||
            purchase.customer_id.toString().includes(search) ||
            purchase.shoe_id.toString().includes(search) ||
            purchase.quantity.toString().includes(search) ||
            purchase.purchase_date.toString().includes(search);
    });

    // Get current purchases for the current page
    const indexOfLastPurchase = currentPage * purchasesPerPage;
    const indexOfFirstPurchase = indexOfLastPurchase - purchasesPerPage;
    const currentpurchases = filteredPurchases.slice(indexOfFirstPurchase, indexOfLastPurchase);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="overflow-x-hidden w-full mt-5" >
            <input
                className='border border-gray-800 px-4 py-2 w-full rounded-lg'
                placeholder='Search Purchases'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="" ref={componentRef}>
                <h2 className="text-2xl font-semibold mb-4 text-center mt-3">List of Purchases</h2>
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Purchase ID</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Customer ID</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Shoe ID</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Quantity</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Purchase Date</th>
                            <th className="px-5 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentpurchases.map((purchase, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="px-6 py-4 border border-gray-300 text-center">{purchase.purchase_id}</td>
                                <td className="px-6 py-4 border border-gray-300 text-center">{purchase.customer_id}</td>
                                <td className="px-6 py-4 border border-gray-300 text-center">
                                    {editId === purchase.purchase_id ? (
                                        <input
                                            type="number"
                                            value={editedshoeid}
                                            onChange={(e) => setEditedshoeid(e.target.value)}
                                            className="w-full"
                                        />
                                    ) : (
                                        purchase.shoe_id
                                    )}
                                </td>
                                <td className="px-6 py-4 border border-gray-300 text-center">
                                    {editId === purchase.purchase_id ? (
                                        <input
                                            type="number"
                                            value={editedquantity}
                                            onChange={(e) => setEditedquantity(e.target.value)}
                                            className="w-full"
                                        />
                                    ) : (
                                        purchase.quantity
                                    )}
                                </td>
                                <td className="px-6 py-4 border border-gray-300 text-center">
                                    {editId === purchase.purchase_id ? (
                                        <input
                                            type="date"
                                            value={editedpurchasedate}
                                            onChange={(e) => setEditedpurchasedate(e.target.value)}
                                            className="w-full"
                                        />
                                    ) : (
                                        purchase.purchase_date
                                    )}
                                </td>
                                <td className="border flex justify-between">
                                    {editId === purchase.purchase_id ? (
                                        <button className="px-6 py-2 justify-center" onClick={() => handleUpdate(purchase.purchase_id)}>Update</button>
                                    ) : (
                                        <>
                                            <button
                                                className='border p-3 px-3 -mr-4 hover:bg-gray-800 hover:text-white'
                                                onClick={() => handleEdit(purchase.purchase_id, purchase.shoe_id, purchase.quantity, purchase.purchase_date)}>
                                                <FaEdit className='w-7 h-7' />
                                            </button>
                                            <button
                                                className='border border-gray-300 p-3 px-3 -ml-3 hover:bg-gray-800 hover:text-white'
                                                onClick={() => handleDelete(purchase.purchase_id)}>
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
                    className="mx-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"                >
                    Previous
                </button>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastPurchase >= filteredPurchases.length}
                    className="mx-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"                >
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
}

export default Purchasestable
