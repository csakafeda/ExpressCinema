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
    }

}