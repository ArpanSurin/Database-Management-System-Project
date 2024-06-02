import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addsuppliers = () => {
    const [Suppliers, setSuppliers] = useState({
        supplier_id: '',
        supplier_name: '',
        email: '',
        phone_number: ''
    })

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!Suppliers.supplier_id || !Suppliers.supplier_name|| !Suppliers.email|| !Suppliers.phone_number) {
            alert("All fields are required.");
            return;
        }

        const formData = {
            supplier_id: Suppliers.supplier_id,
            supplier_name: Suppliers.supplier_name,
            email: Suppliers.email,
            phone_number: Suppliers.phone_number,
        }

        console.log(formData)
        axios.post('http://localhost:3000/add_suppliers', formData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/Suppliers');
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
                <h3 className="text-xl font-semibold mb-4 mt-2 flex justify-center items-center">Add to Suppliers Table</h3>
                <form className="text-md space-y-2" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="inputsupplierid" className="block">Supplier ID</label>
                        <input
                            type="number"
                            id="inputsupplierid"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Supplier ID"
                            onChange={(e) => setSuppliers({ ...Suppliers, supplier_id: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="inputsuppliername" className="block">Supplier Name</label>
                        <input
                            type="text"
                            id="inputsuppliername"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder="Enter Supplier Name"
                            onChange={(e) => setSuppliers({ ...Suppliers, supplier_name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="inputemail" className="block">Email</label>
                        <input
                            type="email"
                            id="inputemail"
                            className="border border-gray-300 px-4 py-2 w-full rounded-lg"
                            placeholder='Enter Email'
                            autoComplete="off"
                            onChange={(e) => setSuppliers({ ...Suppliers, email: e.target.value })}
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
                            onChange={(e) => setSuppliers({ ...Suppliers, phone_number: e.target.value })}
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
export default Addsuppliers
