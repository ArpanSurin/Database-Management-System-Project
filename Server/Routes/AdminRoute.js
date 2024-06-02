import express from 'express';
import con from '../utils/db.js';

const router = express.Router();

        // SHOES START
router.post("/add_shoes", (req, res) => {
    const sql = `INSERT INTO shoes (shoe_id, brand, size, color, price, quantity) VALUES (?,?,?,?,?,?)`;
    const values = [
        req.body.shoe_id,
        req.body.brand,
        req.body.size,
        req.body.color,
        req.body.price,
        req.body.quantity
    ];

    con.query(sql,values, (err, result) => {
        if (err) {
            console.log(err)
            return res.json({ Status: false, Error: err });
        }
        return res.json({ Status: true });
    });
});

router.get('/shoes', (req, res) => {
    const sql = `SELECT * from shoes`;
    con.query(sql, (err, result) => {
        if(err) return res.json({ Status: false, Error: "Query error" })
        return res.json({ Status: true, Result: result});
    })
})

router.put('/shoes/:id', (req, res) => {
    const sql = `UPDATE shoes SET brand = ?, size = ?, color = ?, price = ?, quantity = ? WHERE shoe_id = ?`;
    const values = [
        req.body.brand,
        req.body.size,
        req.body.color,
        req.body.price,
        req.body.quantity,
        req.params.id
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ Status: false, Error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: false, Error: 'Shoe Detail not found' });
        }
        return res.json({ Status: true });
    });
});

router.delete('/shoes/:id', (req, res) => {
    const sql = `DELETE FROM shoes WHERE shoe_id = ?`;
    const values = [req.params.id];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ Status: false, Error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: false, Error: 'Shoe detail not found' });
        }
        return res.json({ Status: true });
    });
});
        // SHOES END

        // CUSTOMERS START
router.post("/add_customers", (req, res) => {
    console.log(req.body)
    const sql = `INSERT INTO customers (customer_id, customer_name, email, phone_number) VALUES (? , ? , ? , ?)`;
    const values = [
        req.body.customer_id,
        req.body.customer_name,
        req.body.email,
        req.body.phone_number,
    ];

    con.query(sql,values, (err, result) => {
        if (err) {
            console.log(err)
            return res.json({ Status: false, Error: err });
        }
        return res.json({ Status: true });
    });
});

router.get('/customers', (req, res) => {
    const sql = `SELECT * from customers`;
    con.query(sql, (err, result) => {
        if(err) return res.json({ Status: false, Error: "Query error" })
        return res.json({ Status: true, Result: result});
    })
})

router.put('/customers/:id', (req, res) => {
    const sql = `UPDATE customers SET customer_name = ?, email = ?, phone_number = ? WHERE customer_id = ?`;
    const values = [
        req.body.customer_name,
        req.body.email,
        req.body.phone_number,
        req.params.id
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ Status: false, Error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: false, Error: 'Customer not found' });
        }
        return res.json({ Status: true });
    });
});

router.delete('/customers/:id', (req, res) => {
    const sql = `DELETE FROM customers WHERE customer_id = ?`;
    const values = [req.params.id];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ Status: false, Error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: false, Error: 'Customer not found' });
        }
        return res.json({ Status: true });
    });
});
        // CUSTOMER END

        // SALES START
        router.post("/add_sales", (req, res) => {
            console.log(req.body)
            const sql = `INSERT INTO sales (sale_id, purchase_id, sale_date, sale_amount) VALUES (? , ? , ? , ?)`;
            const values = [
                req.body.sale_id,
                req.body.purchase_id,
                req.body.sale_date,
                req.body.sale_amount
                ];
        
            con.query(sql,values, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.json({ Status: false, Error: err });
                }
                return res.json({ Status: true });
            });
        });
        
        router.get('/sales', (req, res) => {
            const sql = `SELECT * from sales`;
            con.query(sql, (err, result) => {
                if(err) return res.json({ Status: false, Error: "Query error" })
                return res.json({ Status: true, Result: result});
            })
        })

        router.put('/sales/:id', (req, res) => {
            const sql = `UPDATE sales SET sale_date = ?, sale_amount = ? WHERE sale_id = ?`;
            const values = [
                req.body.sale_date,
                req.body.sale_amount,
                req.params.id
            ];
        
            con.query(sql, values, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({ Status: false, Error: err });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ Status: false, Error: 'Sale detail not found' });
                }
                return res.json({ Status: true });
            });
        });
        
        router.delete('/sales/:id', (req, res) => {
            const sql = `DELETE FROM sales WHERE sale_id = ?`;
            const values = [req.params.id];
        
            con.query(sql, values, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({ Status: false, Error: err });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ Status: false, Error: 'Sale detail not found' });
                }
                return res.json({ Status: true });
            });
        });
        // SALES END

        // SUPPLIERS START
        router.post("/add_suppliers", (req, res) => {
            console.log(req.body)
            const sql = `INSERT INTO suppliers (supplier_id, supplier_name, email, phone_number) VALUES (? , ? , ? , ?)`;
            const values = [
                req.body.supplier_id,
                req.body.supplier_name,
                req.body.email,
                req.body.phone_number
                ];
        
            con.query(sql,values, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.json({ Status: false, Error: err });
                }
                return res.json({ Status: true });
            });
        });
        
        router.get('/suppliers', (req, res) => {
            const sql = `SELECT * from suppliers`;
            con.query(sql, (err, result) => {
                if(err) return res.json({ Status: false, Error: "Query error" })
                return res.json({ Status: true, Result: result});
            })
        })
        
        router.put('/suppliers/:id', (req, res) => {
            const sql = `UPDATE suppliers SET supplier_name = ?, email = ?, phone_number = ? WHERE supplier_id = ?`;
            const values = [
                req.body.supplier_name,
                req.body.email,
                req.body.phone_number,
                req.params.id
            ];
        
            con.query(sql, values, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({ Status: false, Error: err });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ Status: false, Error: 'Supplier record not found' });
                }
                return res.json({ Status: true });
            });
        });
        
        router.delete('/suppliers/:id', (req, res) => {
            const sql = `DELETE FROM suppliers WHERE supplier_id = ?`;
            const values = [req.params.id];
        
            con.query(sql, values, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({ Status: false, Error: err });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ Status: false, Error: 'Supplier record not found' });
                }
                return res.json({ Status: true });
            });
        });
        // SUPPLIERS END
        
        // PURCHASES START
        router.post("/add_purchases", (req, res) => {
            console.log(req.body)
            const sql = `INSERT INTO purchases (purchase_id, customer_id, shoe_id, quantity, purchase_date) VALUES (? , ? , ? , ?, ?)`;
            const values = [
                req.body.purchase_id,
                req.body.customer_id,
                req.body.shoe_id,
                req.body.quantity,
                req.body.purchase_date
                ];
        
            con.query(sql,values, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.json({ Status: false, Error: err });
                }
                return res.json({ Status: true });
            });
        });
        
        router.get('/purchases', (req, res) => {
            const sql = `SELECT * from purchases`;
            con.query(sql, (err, result) => {
                if(err) return res.json({ Status: false, Error: "Query error" })
                return res.json({ Status: true, Result: result});
            })
        })

        router.put('/purchases/:id', (req, res) => {
            const sql = `UPDATE purchases SET shoe_id = ?, quantity = ?, purchase_date = ? WHERE purchase_id = ?`;
            const values = [
                req.body.shoe_id,
                req.body.quantity,
                req.body.purchase_date,
                req.params.id
            ];
        
            con.query(sql, values, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({ Status: false, Error: err });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ Status: false, Error: 'Purchases record not found' });
                }
                return res.json({ Status: true });
            });
        });

        router.delete('/purchases/:id', (req, res) => {
            const sql = `DELETE FROM purchases WHERE purchase_id = ?`;
            const values = [req.params.id];
        
            con.query(sql, values, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({ Status: false, Error: err });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ Status: false, Error: 'Purchases record not found' });
                }
                return res.json({ Status: true });
            });
        });
        // PURCHASES END
        
export default router