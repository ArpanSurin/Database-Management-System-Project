import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Addcustomers = () => {
    const [customers, setCustomers] = useState({
        customer_id: '',
        customer_name:'',
        email: '',
        phone_number:''
    })

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!customers.customer_id || !customers.customer_name || !customers.email || !customers.phone_number) {
            alert("All fields are required.");
            return;
        }

        const formData = {
            customer_id : customers.customer_id,
            customer_name : customers.customer_name,
            email : customers.email,
            phone_number : customers.phone_number,
        }

        console.log(formData)
        axios.post('http://localhost:3000/add_customers', formData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/customers');
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
        <div className="flex justify-center items-center max-w-md mx-auto shadow-lg ">
            <div className="p-3 rounded w-96 ">
                <h3 className="text-xl font-semibold mb-4 mt-2 flex justify-center items-center">Add to Customers Table</h3>
                <form className="text-md space-y-2" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="inputcustomerid" className="block">Customer ID</label>
                        <input 
                            type="number"
                            id="inputcustomerid"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Customer Id"
                            onChange={(e) => setCustomers({ ...customers, customer_id: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="inputcustomername" className="block">Customer Name</label>
                        <input
                            type="text"
                            id="inputcustomername"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Customer Name"
                            autoComplete="off"
                            onChange={(e) => setCustomers({ ...customers, customer_name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="inputemail" className="block">Email</label>
                        <input
                            type="email"
                            id="inputemail"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Email"
                            autoComplete="off"
                            onChange={(e) => setCustomers({ ...customers, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="inputphonenumber" className="block">Phone Number</label>
                        <input
                            type="number"
                            id="inputphonenumber"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Phone Number"
                            autoComplete="off"
                            onChange={(e) => setCustomers({ ...customers, phone_number: e.target.value })}
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

export default Addcustomers
