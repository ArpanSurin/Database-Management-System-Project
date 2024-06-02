import React from 'react';
import { FaHome, FaShoppingBag, FaRupeeSign } from 'react-icons/fa';
import { FaChild, FaHandshake } from 'react-icons/fa6';
import { GiConverseShoe } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <div className='border-black inline absolute w-64 bg-gray-300 h-full'>
                <div className='h-16 flex items-center justify-center'>
                    <h1 className="text-2xl font-bold">TABLES</h1>
                </div>
                <hr />
                <ul className="font-bold border-black">
                        <Link to="/" className="px-3">
                    <li className="text-xl rounded hover:shadow hover:bg-black hover:text-white py-5 px-7 cursor-pointer">
                            <FaHome className='inline-block w-6 h-6 mr-2 -mt-2'></FaHome>
                            Home
                    </li>
                        </Link>
                        <Link to="/shoes" className="px-3">
                    <li className="text-xl rounded hover:shadow hover:-white hover:bg-black hover:text-white py-5 px-7 cursor-pointer">
                            <GiConverseShoe className='inline-block w-6 h-6 mr-2 -mt-2'></GiConverseShoe>
                            Shoes
                    </li>
                        </Link>
                        <Link to="/customers" className="px-3">
                    <li className="text-xl rounded hover:shadow hover:bg-black hover:text-white py-5 px-7 cursor-pointer">
                            <FaChild className='inline-block w-6 h-6 mr-2 -mt-2'></FaChild>
                            Customers
                    </li>
                        </Link>
                        <Link to="/sales" className="px-3">
                    <li className="text-xl rounded hover:shadow hover:bg-black hover:text-white py-5 px-7 cursor-pointer">
                            <FaRupeeSign className='inline-block w-6 h-6 mr-2 -mt-2'></FaRupeeSign>
                            Sales
                    </li>
                        </Link>
                        <Link to="/suppliers" className="px-3">
                    <li className="text-xl rounded hover:shadow hover:bg-black hover:text-white py-5 px-7 cursor-pointer">
                            <FaHandshake className='inline-block w-6 h-6 mr-2 -mt-2'></FaHandshake>
                            Suppliers
                    </li>
                        </Link>
                        <Link to="/purchases" className="px-3">
                    <li className="text-xl rounded hover:shadow hover:bg-black hover:text-white py-5 px-7 cursor-pointer">
                            <FaShoppingBag className='inline-block w-6 h-6 mr-2 -mt-2'></FaShoppingBag>
                            Purchases
                    </li>
                        </Link>
                </ul>
            </div>
            
            
        </>
    )
}

export default Sidebar
