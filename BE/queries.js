const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'crm',
    host: 'localhost',
    database: 'crmdb',
    password: "crm123",
    port: 5432,
})

const getAllUsers = (req, res) => {
    pool.query("SELECT * FROM users", (error, result) => {
        if(error){
            throw error;
        }
        res.status(200).json(result.rows);
    })
}

const getAllProducts = (req, res) => {
    pool.query("SELECT * FROM products ORDER BY product_id ASC", (error, result) => {
        if(error){
            throw error;
        }
        res.status(200).json(result.rows);
    })
}

const getProdByUser = (req, res) => {
    const user_id = Number(req.params.user_id);
    
    pool.query("SELECT * FROM products WHERE user_id = $1", [user_id], (error, result) => {
        if(error){
            throw error;
        }
        res.status(200).json(result.rows);
    })

}

const getLoggedInUser = (req, res) => {
    const {email, password} = req.body;


    pool.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, password], (error, result) => {
        if(error){
            throw error;
        }
        res.status(200).json(result.rows);
    })  

}



module.exports = {getAllUsers, getAllProducts, getProdByUser, getLoggedInUser}; 