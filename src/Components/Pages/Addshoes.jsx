import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddShoes = () => {
    const [shoes, setShoes] = useState({
        shoe_id: '',
        brand: '',
        size: '',
        color: '',
        price: '',
        quantity: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(e);

        if (!shoes.shoe_id || !shoes.brand || !shoes.size || !shoes.color || !shoes.price || !shoes.quantity) {
            alert("All fields are required.");
            return;
        }

        const formData = {
            shoe_id : shoes.shoe_id,
            brand : shoes.brand,
            size : shoes.size,
            color : shoes.color,
            price : shoes.price,
            quantity : shoes.quantity,
        }

        console.log(formData)
        axios.post('http://localhost:3000/add_shoes', formData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/shoes');
                } else {
                    alert(JSON.stringify(result.data));
                }
            })
            .catch(error => {
                // Handle AxiosError
                if (error.response) {
                    // Server responded with an error status code
                    console.log('Server responded with:', error.response.status);
                    console.log('Error data:', error.response.data);
                } else if (error.request) {
                    // Request made but no response received
                    console.log('No response received from the server');
                } else {
                    // Something else went wrong
                    console.log('Error occurred:', error.message);
                }
            });
    };

    return (
        <div className="max-w-md mx-auto shadow-lg ">
            <div className="p-3 rounded w-96 ">
                <h3 className="text-xl font-semibold mb-4 mt-2">Add to Shoes Table</h3>
                <form className="text-md space-y-2" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="inputShoeID" className="block">Shoe ID</label>
                        <input 
                            type="number"
                            id="inputShoeID"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Shoe ID"
                            onChange={(e) => setShoes({ ...shoes, shoe_id: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="inputBrand" className="block">Brand</label>
                        <input
                            type="text"
                            id="inputBrand"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Brand"
                            autoComplete="off"
                            onChange={(e) => setShoes({ ...shoes, brand: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="inputSize" className="block">Size</label>
                        <input
                            type="number"
                            id="inputSize"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Size"
                            autoComplete="off"
                            onChange={(e) => setShoes({ ...shoes, size: e.target.value })}
                            min="1"
                        />
                    </div>
                    <div>
                        <label htmlFor="inputColor" className="block">Color</label>
                        <input
                            type="text"
                            id="inputColor"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Color of Shoe"
                            autoComplete="off"
                            onChange={(e) => setShoes({ ...shoes, color: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="inputPrice" className="block">Price</label>
                        <input
                            type="number"
                            id="inputPrice"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Price"
                            autoComplete="off"
                            onChange={(e) => setShoes({ ...shoes, price: e.target.value })}
                            min="0"
                        />
                    </div>
                    <div>
                        <label htmlFor="inputQuantity" className="block">In Stock</label>
                        <input
                            type="number"
                            id="inputQuantity"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter no. of shoes in stock"
                            autoComplete="off"
                            onChange={(e) => setShoes({ ...shoes, quantity: e.target.value })}
                            min="0"
                        />
                    </div>
                    <div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Add to Table</button>
                    </div>
                </form>
            </div>
        </div>
    );    
    
};
export default AddShoes;
