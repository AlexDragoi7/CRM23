const http = require('http');
const express = require('express');
const db = require('./queries');

const port = 3300;

const app = express();
app.use(express.json());

app.get("/users", db.getAllUsers);
app.get("/products", db.getAllProducts);
app.get("/products/:user_id", db.getProdByUser);

http.createServer(app).listen(port, () => {
    console.log(`Connected to port ${port}`);
})