const express = require('express');
const app = express();
const seatRouter = require("./routes/seatRouter");
const con = require("./config/db.js")

app.use(express.json());
app.use(function(req, res, next) {
    req.con = con
    next()
})

app.use("/api/seats", seatRouter);

app.listen(8080, () => {
    console.log('Server is running on port 8080.');
});
