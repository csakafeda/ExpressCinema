const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log("You are now at the '/' endpoint! ");
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
