import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Customertable = () => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [editId, setEditId] = useState('');
    const [editedCustomerName, setEditedCustomerName] = useState('');
    const [editedCustomerEmail, setEditedCustomerEmail] = useState('');
    const [editedCustomerPhoneNumber, setEditedCustomerPhoneNumber] = useState('');
    
    const componentRef = useRef();

    const fetchCustomers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/customers");
            setCustomers(res.data.Result);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'List_of_Customers',
    });

    const handleEdit = (customer_id, customer_name, customer_email, customer_phone_number) => {
        setEditId(customer_id);
        setEditedCustomerName(customer_name);
        setEditedCustomerEmail(customer_email);
        setEditedCustomerPhoneNumber(customer_phone_number);
    };

    const handleUpdate = async (customer_id) => {
        try {
            await axios.put(`http://localhost:3000/customers/${customer_id}`, {
                customer_name: editedCustomerName,
                email: editedCustomerEmail,
                phone_number: editedCustomerPhoneNumber
            });
            setEditId(''); // Exit edit mode after update
            fetchCustomers(); // Refresh customer list after update
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    const handleDelete = async (customer_id) => {
        try {
            await axios.delete(`http://localhost:3000/customers/${customer_id}`);
            fetchCustomers(); // Refresh customer list after deletion
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    const filteredCustomers = customers.filter(customer => {
        return search.trim() === '' || customer.customer_name.toLowerCase().includes(search.toLowerCase());
    });

    // Get current Customers for the current page
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="overflow-x-hidden w-full mt-5">
            <input
                className='border border-gray-800 px-4 py-2 w-full rounded-lg'
                placeholder='Search Customers'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="" ref={componentRef}>
                <h2 className="text-2xl font-semibold mb-4 text-center mt-3">List of Customers</h2>
                <table className="table-auto w-full border-collapse" >
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Customer ID</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Customer Name</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Email</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Phone Number</th>
                            <th className="px-5 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCustomers.map((customer, index) => (
                            <tr key={customer.customer_id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="px-6 py-4 border border-gray-300 text-center">{customer.customer_id}</td>
                                <td className="px-6 py-4 border border-gray-300 text-center">
                                    {editId === customer.customer_id ? (
                                        <input type="text" value={editedCustomerName} onChange={(e) => setEditedCustomerName(e.target.value)} />
                                    ) : (
                                        customer.customer_name
                                    )}
                                </td>
                                <td className="px-6 py-4 border border-gray-300 text-center">
                                    {editId === customer.customer_id ? (
                                        <input type="email" value={editedCustomerEmail} onChange={(e) => setEditedCustomerEmail(e.target.value)} />
                                    ) : (
                                        customer.email
                                    )}
                                </td>
                                <td className="px-6 py-4 border border-gray-300 text-center">
                                    {editId === customer.customer_id ? (
                                        <input type="number" value={editedCustomerPhoneNumber} onChange={(e) => setEditedCustomerPhoneNumber(e.target.value)} />
                                    ) : (
                                        customer.phone_number
                                    )}
                                </td>
                                <td className="border flex justify-between">
                                    {editId === customer.customer_id ? (
                                        <button className="px-6 py-3" onClick={() => handleUpdate(customer.customer_id)}>Update</button>
                                    ) : (
                                        <>
                                            <button className='border p-3 px-3 -mr-2 hover:bg-gray-800 hover:text-white' onClick={() => handleEdit(customer.customer_id, customer.customer_name, customer.email, customer.phone_number)}>
                                                <FaEdit className='w-7 h-7' />
                                            </button>
                                            <button className='border border-gray-300 p-3 px-3 -ml-2 hover:bg-gray-800 hover:text-white' onClick={() => handleDelete(customer.customer_id)}>
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
                    className="mx-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                >
                    Previous
                </button>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastCustomer >= filteredCustomers.length}
                    className="mx-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                >
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

export default Customertable;
