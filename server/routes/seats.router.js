const {Router} = require("express");
const nodemailer = require('nodemailer');

const seatRouter = new Router();

const seats = [
    {id: 1, status: 'available'},
    {id: 2, status: 'available'},
    {id: 3, status: 'available'},
    {id: 4, status: 'available'},
    {id: 5, status: 'available'}
];

seatRouter.get("/", async (req, res) => {
    res.json(seats);
});

seatRouter.post('/reserve', (req, res) => {
    const seatId = parseInt(req.body.seatId);
    const userId = req.body.userId;

    const seat = seats.find(seat => seat.id === seatId);
    if (!seat || seat.status !== 'available') {
        res.status(400).json({error: 'The seat cannot be reserved.'});
        return;
    }
    seat.status = "reserved";
    seat["userId"] = userId;

    res.json({message: 'Reservation successful.'});
});

seatRouter.post('/pay', (req, res) => {
    const seatId = parseInt(req.body.seatId);
    const userId = parseInt(req.body.userId);
    const userEmail = req.body.email;

    const seat = seats.find(seat => seat.id === seatId);
    if (!seat || seat.status !== 'reserved') {
        res.status(400).json({error: 'The seat cannot be paid for.'});
        return;
    }

    if (!userId) {
        res.status(400).json({error: 'The seat cannot be reserved.'});
        return;
    }

    seat.status = 'sold';
    seat["userId"] = userId;

    // TODO: Implement email sending using Nodemailer

    res.json({message: 'Payment successful.'});
});

module.exports = seatRouter;