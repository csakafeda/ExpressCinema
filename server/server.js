const express = require('express');
const mysql = require('mysql');

const app = express();
const seatRouter = require("./routes/seats.router")

app.use(express.json());

app.use("/api/seats", seatRouter);

app.listen(8080, () => {
    console.log('Server is running on port 8080.');
});
