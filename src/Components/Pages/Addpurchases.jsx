import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addpurchases = () => {
    const [purchases, setPurchases] = useState({
        purchase_id: '',
        customer_id: '',
        shoe_id: '',
        quantity: '',
        purchase_date: '',
    })

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!purchases.purchase_id || !purchases.customer_id|| !purchases.shoe_id|| !purchases.quantity || !purchases.purchase_date) {
            alert("All fields are required.");
            return;
        }

        const formData = {
            purchase_id: purchases.purchase_id,
            customer_id: purchases.customer_id,
            shoe_id: purchases.shoe_id,
            quantity: purchases.quantity,
            purchase_date: purchases.purchase_date,
        }

        console.log(formData)
        axios.post('http://localhost:3000/add_purchases', formData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/purchases');
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
        <div className=" max-w-md mx-auto shadow-lg ">
            <div className="p-3 rounded w-96 ">
                <h3 className="text-xl font-semibold mb-4 mt-2 flex justify-center items-center">Add to Purchases Table</h3>
                <form className="text-md space-y-2" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="inputpurchaseid" className="block">Purchase ID</label>
                        <input
                            type="number"
                            id="inputpurchaseid"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Purchase ID"
                            onChange={(e) => setPurchases({ ...purchases, purchase_id: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="inputcustomerid" className="block">Customer ID</label>
                        <input
                            type="number"
                            id="inputcustomerid"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Customer ID"
                            onChange={(e) => setPurchases({ ...purchases, customer_id: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="inputshoeid" className="block">Shoe ID</label>
                        <input
                            type="number"
                            id="inputshoeid"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Shoe ID"
                            onChange={(e) => setPurchases({ ...purchases, shoe_id: e.target.value })}
                        />
                    </div>
                    

                    <div>
                        <label htmlFor="inputquantity" className="block">Quantity</label>
                        <input
                            type="number"
                            id="inputquantity"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder='Enter Quantity'
                            autoComplete="off"
                            onChange={(e) => setPurchases({ ...purchases, quantity: e.target.value })}
                            min="1"
                        />
                    </div>

                    <div>
                        <label htmlFor="inputpurchasedate" className="block">Purchase Date</label>
                        <input
                            type="date"
                            id="inputpurchasedate"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Purchase Date"
                            autoComplete="off"
                            onChange={(e) => setPurchases({ ...purchases, purchase_date: e.target.value })}
                        />
                    </div>
                    <div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Add to Table</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
export default Addpurchases
