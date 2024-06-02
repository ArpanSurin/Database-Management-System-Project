import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import Customertable from './Customertable'
import { useReactToPrint } from 'react-to-print'

const Customers = () => {

    const compRef = useRef(null);
    const generatePDF = useReactToPrint({
        content: compRef.current,
        documentTitle: 'CustomerData',
        onAfterPrint: ()=> alert("Data saved to pdf")
    })
    return (
        <div className="px-5 w-full h-full flex flex-col justify-center items-center">
            <div className="text-xl font-bold flex justify-center h-full">
                <h3 className='text-2xl mt-3 space-y-5'>Customers Table</h3>
            </div>

            <button className="hover:bg-gray-800 bg-gray-300 text-black hover:text-white font-bold py-2 px-4 rounded mt-4 inline-block">
            <Link to="/add_customers">
                Add to Table
            </Link>
            </button>
            <Customertable ref={compRef}/>
        </div>
    )
}

export default Customers
