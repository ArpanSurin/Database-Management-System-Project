import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useReactToPrint } from 'react-to-print';

const Supplierstable = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [suppliersPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [editId, setEditId] = useState('');
    const [editedsuppliername, setEditedsuppliername] = useState('');
    const [editedemail, setEditedemail] = useState('');
    const [editedphone, setEditedphone] = useState('');

    const componentRef = useRef();

    const fetchSuppliers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/suppliers");
            setSuppliers(res.data.Result);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'List_of_Suppliers',
    });

    const handleEdit = (supplier_id, supplier_supplier_name, supplier_email, supplier_phone_number) => {
        setEditId(supplier_id);
        setEditedsuppliername(supplier_supplier_name);
        setEditedemail(supplier_email);
        setEditedphone(supplier_phone_number);
    };

    const handleUpdate = async(supplier_id) => {
        try {
            await axios.put(`http://localhost:3000/suppliers/${supplier_id}`, {
                supplier_name: editedsuppliername,
                email: editedemail,
                phone_number: editedphone
            });
            setEditId(''); // Exit edit mode after update
            fetchSuppliers(); // Refresh shoe list after update
        } catch (error) {
            console.error("Error updating supplier record", error);
        }
    };

    const handleDelete = async(supplier_id) => {
        try {
            await axios.delete(`http://localhost:3000/suppliers/${supplier_id}`);
            fetchSuppliers();
        } catch (error) {
            console.error("Error deleting supplier record: ", error);
        }
    };

    // Filter suppliers based on search query
    const filteredSuppliers = suppliers.filter(supplier => {
        return supplier.supplier_id.toString().includes(search) ||
            supplier.supplier_name.toLowerCase().includes(search) ||
            supplier.email.toLowerCase().includes(search) ||
            supplier.phone_number.toString().includes(search); // Convert phone_number to string
    });

    // Get current suppliers for the current page
    const indexOfLastSupplier = currentPage * suppliersPerPage;
    const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
    const currentSuppliers = filteredSuppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="overflow-x-hidden w-full mt-5">
            <input
                className='border border-gray-800 px-4 py-2 w-full rounded-lg'
                placeholder='Search Suppliers'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="" ref={componentRef}>
                <h2 className="text-2xl font-semibold mb-4 text-center mt-3">List of Suppliers</h2>
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Supplier ID</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Supplier Name</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Email</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Phone Number</th>
                            <th className="px-3 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSuppliers.map((supplier, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="px-6 py-4 border border-gray-300 text-center">{supplier.supplier_id}</td>
                                <td className="px-6 py-4 border border-gray-300 text-center">
                                    {editId === supplier.supplier_id ? (
                                        <input
                                            type="text"
                                            value={editedsuppliername}
                                            onChange={(e) => setEditedsuppliername(e.target.value)}
                                            className="w-full"
                                        />
                                    ) : (
                                        supplier.supplier_name
                                    )}
                                </td>
                                <td className="px-6 py-4 border border-gray-300 text-center">
                                    {editId === supplier.supplier_id ? (
                                        <input
                                            type="email"
                                            value={editedemail}
                                            onChange={(e) => setEditedemail(e.target.value)}
                                            className="w-full"
                                        />
                                    ) : (
                                        supplier.email
                                    )}
                                </td>
                                <td className="px-6 py-4 border border-gray-300 text-center">
                                    {editId === supplier.supplier_id ? (
                                        <input
                                            type="number"
                                            value={editedphone}
                                            onChange={(e) => setEditedphone(e.target.value)}
                                            className="w-full"
                                        />
                                    ) : (
                                        supplier.phone_number
                                    )}
                                </td>
                                <td className="border flex justify-between">
                                    {editId === supplier.supplier_id ? (
                                        <button className="px-6 py-3 justify-center" onClick={() => handleUpdate(supplier.supplier_id)}>Update</button>
                                    ) : (
                                        <>
                                            <button 
                                                className='border p-3 px-3 -mr-0 hover:bg-gray-800 hover:text-white' 
                                                onClick={() => handleEdit(supplier.supplier_id, supplier.supplier_name, supplier.email, supplier.phone_number)}>
                                                <FaEdit className='w-7 h-7' />
                                            </button>
                                            <button 
                                                className='border border-gray-300 p-3 px-3 -ml-0 hover:bg-gray-800 hover:text-white' 
                                                onClick={() => handleDelete(supplier.supplier_id)}>
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
                    disabled={indexOfLastSupplier >= filteredSuppliers.length}
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
}

export default Supplierstable;
