import React from 'react'
import { Link } from 'react-router-dom'
import Supplierstable from './Supplierstable'

const Suppliers = () => {
    return (
        <div className="px-5 w-full h-full flex flex-col justify-center items-center">
            <div className="text-xl font-bold flex justify-center h-full">
                <h3 className='text-2xl mt-3 space-y-5'>Suppliers Table</h3>
            </div>

            <button className="hover:bg-gray-800 bg-gray-300 text-black hover:text-white font-bold py-2 px-4 rounded mt-4 inline-block">
            <Link to="/add_suppliers">
                Add to Table
            </Link>
            </button>
            <Supplierstable />
        </div>
    )
}

export default Suppliers
