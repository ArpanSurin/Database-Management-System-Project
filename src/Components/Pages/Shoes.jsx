import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import Shoetable from './Shoetable'

const Shoes = () => {
    const onButtonClick = () => {
        const pdfUrl = "C:/Projects/Shoes website/Web Docs/sample.pdf";
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "shoes.pdf"; // specify the filename
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div className="px-5 w-full h-full flex flex-col justify-center items-center">
            <div className="text-xl font-bold flex justify-center h-full">
                <h3 className='text-2xl mt-3 space-y-5'>Shoes Table</h3>
            </div>
            <Link to="/add_shoes" className="hover:bg-gray-800 bg-gray-300 text-black hover:text-white font-bold py-2 px-4 rounded mt-4 inline-block">
                Add to Table
            </Link>
            <div></div>
            <Shoetable />
        </div>

    )
}

export default Shoes
