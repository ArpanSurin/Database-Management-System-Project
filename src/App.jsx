import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Shoes from './Components/Pages/Shoes';
import Addshoes from './Components/Pages/Addshoes';
import Customers from './Components/Pages/Customers';
import Addcustomers from './Components/Pages/Addcustomers';
import Sales from './Components/Pages/Sales';
import Addsales from './Components/Pages/Addsales';
import Suppliers from './Components/Pages/Suppliers';
import Addsuppliers from './Components/Pages/Addsuppliers';
import Purchases from './Components/Pages/Purchases';
import Home from './Components/Pages/Home';
import Navbar from './Components/Navbar';
import Addpurchases from './Components/Pages/Addpurchases';

const App = () => {
  return (
    <div className="">
      <Navbar />
      <Router>
        <div className="h-auto">
          <Sidebar />
          <div className='sm:ml-64 '>
            <Routes >
              <Route path="/" element={<Home />} />
              <Route path="/shoes" element={<Shoes />} />
              <Route path="/add_shoes" element={<Addshoes />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/add_customers" element={<Addcustomers />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/add_sales" element={<Addsales />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/add_suppliers" element={<Addsuppliers />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/add_purchases" element={<Addpurchases />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
