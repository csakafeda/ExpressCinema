const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const seatRouter = require("./routes/seats.router");
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
connection.connect((err) => {
    if (err) console.log(err);
    else console.log("Connected to DB")
})

app.use(express.json());

app.use("/api/seats", seatRouter);


app.listen(8080, () => {
    console.log('Server is running on port 8080.');
});
