const seatModel = require("../model/seatModel");
const mailSender = require("../tools/sendmail")

module.exports = {
    getAllSeats: (req, res) => {
        seatModel.getAllSeats(req.con, function (err, result) {
            res.json(result);
        })
    },
    postSeat: (req, res) => {
        seatModel.getAllSeats(req.con, (err, seats) => {
            const lowestAvailableId = getLowestAvailableId(seats);
            const newSeat = {id: lowestAvailableId, status: "available", userId: null};

            seatModel.postSeat(req.con, newSeat, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({error: "Failed to add the seat."});
                    return;
                }

                const newSeatId = result.insertId;
                res.json({id: newSeatId, status: "available", userId: null});
            });
        });
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
    },
    deleteAllSeats: (req, res) => {
        seatModel.deleteAllSeats(req.con, (err, result) => {
            if (err) {
                res.status(500).json({error: 'Failed to delete all seats.'});
                return;
            }
            res.json({message: 'Delete was successful.'});
        });
    }
}

function getLowestAvailableId(seats) {
    const sortedSeats = seats.sort((a, b) => a.id - b.id);
    let lowestId = 1;
    for (const seat of sortedSeats) {
        if (seat.id > lowestId) {
            return lowestId;
        }
        lowestId++;
    }
    return -1;
}