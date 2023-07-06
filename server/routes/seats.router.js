const { Router } = require("express");

const seatRouter = new Router();

const seats = [
    {id: 1, status: 'available'},
    {id: 2, status: 'available'},
    {id: 3, status: 'available'},
    {id: 4, status: 'available'},
    {id: 5, status: 'reserved'}
];

seatRouter.get("/", async (req, res) => {
    res.json(seats);
});

module.exports = seatRouter;