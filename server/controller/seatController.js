const seatModel = require("../model/seatModel");
const mailSender = require("../tools/sendmail")

module.exports = {
    getAllSeats: function (req, res) {
        seatModel.getAllSeats(req.con, function (err, result) {
            res.json(result);
        })
    },
    postSeat: function (req, res) {
        seatModel.postSeat(req.con, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({error: "Failed to add the seat."});
                return;
            }
            const newSeatId = result.insertId;
            res.json({id: newSeatId, status: "available", userId: null})
        })
    },
    reserveSeat: (req, res) => {
        const seatId = req.body.seatId;
        const userId = req.body.userId;

        seatModel.reserveSeat(seatId, req.con, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({error: "Failed to reserve the seat."});
                return;
            }
            if (result.length === 0) {
                res.status(404).json({error: "Seat not found or already reserved."});
            }
        });
        seatModel.updateToReserved(seatId, userId, req.con, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({error: 'Failed to reserve the seat.'});
                return;
            }
            res.json({message: 'Reservation successful.'});
        })
    },
    paySeats: (req, res) => {
        const seatId = parseInt(req.body.seatId);
        const userId = parseInt(req.body.userId);
        const userEmail = req.body.email;
        seatModel.paySeats(seatId, userId, req.con, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({error: 'Failed to process payment.'});
                return;
            }
            if (result.length === 0) {
                res.status(400).json({error: 'The seat cannot be paid for.'});
            } else {
                seatModel.updateToSold(seatId, userId, req.con, (err, updateResult) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({error: 'Failed to process payment.'});
                        return;
                    }
                    mailSender({"seatId": seatId, "userEmail": userEmail})
                        .then((result) => {
                            res.json(result === "error" ? {error: 'Failed to send email.'} : {message: 'Payment successful.'});
                        })
                })
            }
        })
    }
}