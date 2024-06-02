import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addsales = () => {
    const [Sales, setSales] = useState({
        sale_id: '',
        purchase_id: '',
        sale_date: '',
        sale_amount: ''
    })

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!Sales.sale_id || !Sales.purchase_id || !Sales.sale_date || !Sales.sale_amount) {
            alert("All fields are required.");
            return;
        }

        const formData = {
            sale_id: Sales.sale_id,
            purchase_id: Sales.purchase_id,
            sale_date: Sales.sale_date,
            sale_amount: Sales.sale_amount,
        }

        console.log(formData)
        axios.post('http://localhost:3000/add_sales', formData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/sales');
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
                <h3 className="text-xl font-semibold mb-4 mt-2 flex justify-center items-center">Add to Sales Table</h3>
                <form className="text-md space-y-2" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="inputsaleid" className="block">Sale ID</label>
                        <input
                            type="number"
                            id="inputsaleid"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Sale ID"
                            onChange={(e) => setSales({ ...Sales, sale_id: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="inputpurchaseid" className="block">Purchase ID</label>
                        <input
                            type="number"
                            id="inputpurchaseid"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Purchase ID"
                            onChange={(e) => setSales({ ...Sales, purchase_id: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="inputsaledate" className="block">Sale Date</label>
                        <input
                            type="date"
                            id="inputsaledate"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            autoComplete="off"
                            onChange={(e) => setSales({ ...Sales, sale_date: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="inputsaleamount" className="block">Sale Amount</label>
                        <input
                            type="number"
                            id="inputsaleamount"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Sale Amount"
                            autoComplete="off"
                            onChange={(e) => setSales({ ...Sales, sale_amount: e.target.value })}
                            min="1"
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


export default Addsales
