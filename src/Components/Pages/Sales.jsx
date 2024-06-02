import React from 'react'
import { Link } from 'react-router-dom'
import Salestable from './Salestable'

const Sales = () => {
    return (
        <div className="px-5 w-full h-full flex flex-col justify-center items-center">
            <div className="text-xl font-bold flex justify-center h-full">
                <h3 className='text-2xl mt-3 space-y-5'>Sales Table</h3>
            </div>

            <button className="hover:bg-gray-800 bg-gray-300 text-black hover:text-white font-bold py-2 px-4 rounded mt-4 inline-block">
            <Link to="/add_sales">
                Add to Table
            </Link>
            </button>
            <Salestable />
        </div>

    )
}

export default Sales
