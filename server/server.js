const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require('cors');
const seatRouter = require("./routes/seatRouter");
const con = require("./config/db.js");
require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(function (req, res, next) {
    req.con = con
    next()
});

app.use("/api/seats", seatRouter);

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);
    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data);
    });
});

server.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port 8080.');
});
