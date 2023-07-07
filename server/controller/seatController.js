const seatModel = require("../model/seatModel")

module.exports = {
    getAllSeats: function (req, res) {
        seatModel.getAllSeats(req.con, function (err, rows) {
            res.json(rows)
        })
    },

}