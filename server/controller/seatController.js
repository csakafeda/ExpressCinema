const seatModel = require("../model/seatModel")

module.exports = {
    getAllSeats: function (req, res) {
        seatModel.getAllSeats(req.con, function (err, rows) {
            res.json(rows);
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
                return;
            }
        });
        seatModel.updateToReserved(seatId, userId, req.con,(err, result)=>{
            if (err) {
                console.error(err);
                res.status(500).json({error: 'Failed to reserve the seat.'});
                return;
            }
            res.json({message: 'Reservation successful.'});
        })

    }

}