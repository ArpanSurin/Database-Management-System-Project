import mysql from 'mysql2'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Database_Systems_23",
    database: "shoe_shop"
})

con.connect(function(err) {
    if(err) {
        console.log("Connection error")
    } else {
        console.log("Test Connection Successful: Database Connected Successfully")
    }
})

export default con;