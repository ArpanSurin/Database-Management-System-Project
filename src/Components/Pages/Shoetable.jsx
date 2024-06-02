import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Shoetable = () => {
    const [shoes, setShoes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [shoesPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [editId, setEditId] = useState('');
    const [editedShoebrand, setEditedShoebrand] = useState('');
    const [editedShoesize, setEditedShoesize] = useState('');
    const [editedShoecolor, setEditedShoecolor] = useState('');
    const [editedShoeprice, setEditedShoeprice] = useState('');
    const [editedShoeinstock, setEditedShoeinstock] = useState('');

    const componentRef = useRef();

    const fetchShoes = async () => {
        try {
            const res = await axios.get("http://localhost:3000/shoes");
            setShoes(res.data.Result);
        } catch (error) {
            console.error("Error fetching shoes:", error);
        }
    };

    useEffect(() => {
        fetchShoes();
    }, []);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'List_of_Shoes',
    });

    const handleEdit = (shoe_id, shoe_brand, shoe_size, shoe_color, shoe_price, shoe_in_stock) => {
        setEditId(shoe_id);
        setEditedShoebrand(shoe_brand);
        setEditedShoesize(shoe_size);
        setEditedShoecolor(shoe_color);
        setEditedShoeprice(shoe_price);
        setEditedShoeinstock(shoe_in_stock);
    };

    const handleUpdate = async (shoe_id) => {
        try {
            await axios.put(`http://localhost:3000/shoes/${shoe_id}`, {
                brand: editedShoebrand,
                size: editedShoesize,
                color: editedShoecolor,
                price: editedShoeprice,
                quantity: editedShoeinstock
            });
            setEditId(''); // Exit edit mode after update
            fetchShoes(); // Refresh shoe list after update
        } catch (error) {
            console.error("Error updating shoe detail:", error);
        }
    };

    const handleDelete = async (shoe_id) => {
        try {
            await axios.delete(`http://localhost:3000/shoes/${shoe_id}`);
            fetchShoes(); // Refresh shoe list after deletion
        } catch (error) {
            console.error("Error deleting shoe:", error);
        }
    };

    // Filter shoes based on search query
    const filteredShoes = shoes.filter(shoe => {
        return shoe.shoe_id.toString().includes(search) ||
            shoe.brand.toLowerCase().includes(search.toLowerCase()) ||
            shoe.color.toLowerCase().includes(search.toLowerCase()) ||
            shoe.size.toString().includes(search);
    });

    // Get current shoes for the current page
    const indexOfLastShoe = currentPage * shoesPerPage;
    const indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
    const currentShoes = filteredShoes.slice(indexOfFirstShoe, indexOfLastShoe);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="overflow-x-hidden w-full mt-5">
            <input
                className='border border-gray-800 px-4 py-2 w-full rounded-lg'
                placeholder='Search Shoes'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="" ref={componentRef}>
                <h2 className="text-2xl font-semibold mb-4 text-center mt-3">List of Shoe Orders</h2>
                <table className="w-full border-collapse table-auto">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Shoe ID</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Brand</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Size</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Color</th>
                            <th className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Price</th>
                            <th className="px-3 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">In Stock</th>
                            <th className="px-3 py-3 bg-gray-200 text-gray-700 font-semibold uppercase border border-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentShoes.map((shoe, index) => (
                            <tr key={shoe.shoe_id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="px-2 py-3 border border-gray-300 text-center">{shoe.shoe_id}</td>
                                <td className="px-2 py-3 border border-gray-300 text-center">
                                    {editId === shoe.shoe_id ? (
                                        <input 
                                            type="text" 
                                            value={editedShoebrand} 
                                            onChange={(e) => setEditedShoebrand(e.target.value)} 
                                            className="w-full"
                                        />
                                    ) : (
                                        shoe.brand
                                    )}
                                </td>
                                <td className="px-2 py-3 border border-gray-300 text-center">
                                    {editId === shoe.shoe_id ? (
                                        <input 
                                            type="number" 
                                            value={editedShoesize} 
                                            onChange={(e) => setEditedShoesize(e.target.value)} 
                                            className="w-full"
                                        />
                                    ) : (
                                        shoe.size
                                    )}
                                </td>
                                <td className="px-2 py-3 border border-gray-300 text-center">
                                    {editId === shoe.shoe_id ? (
                                        <input 
                                            type="text" 
                                            value={editedShoecolor} 
                                            onChange={(e) => setEditedShoecolor(e.target.value)} 
                                            className="w-full"
                                        />
                                    ) : (
                                        shoe.color
                                    )}
                                </td>
                                <td className="px-2 py-3 border border-gray-300 text-center">
                                    {editId === shoe.shoe_id ? (
                                        <input 
                                            type="number" 
                                            value={editedShoeprice} 
                                            onChange={(e) => setEditedShoeprice(e.target.value)} 
                                            className="w-full"
                                        />
                                    ) : (
                                        shoe.price
                                    )}
                                </td>
                                <td className="px-2 py-3 border border-gray-300 text-center">
                                    {editId === shoe.shoe_id ? (
                                        <input 
                                            type="number" 
                                            value={editedShoeinstock} 
                                            onChange={(e) => setEditedShoeinstock(e.target.value)} 
                                            className="w-full"
                                        />
                                    ) : (
                                        shoe.quantity
                                    )}
                                </td>
                                <td className="border flex justify-between">
                                    {editId === shoe.shoe_id ? (
                                        <button className="px-6 py-3 justify-center" onClick={() => handleUpdate(shoe.shoe_id)}>Update</button>
                                    ) : (
                                        <>
                                            <button 
                                                className='border p-3 px-3 -mr-5 hover:bg-gray-800 hover:text-white' 
                                                onClick={() => handleEdit(shoe.shoe_id, shoe.brand, shoe.size, shoe.color, shoe.price, shoe.quantity)}>
                                                <FaEdit className='w-7 h-7' />
                                            </button>
                                            <button 
                                                className='border border-gray-300 p-3 px-3 -ml-6 hover:bg-gray-800 hover:text-white' 
                                                onClick={() => handleDelete(shoe.shoe_id)}>
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
                    disabled={indexOfLastShoe >= filteredShoes.length}
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

export default Shoetable;
