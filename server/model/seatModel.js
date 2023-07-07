module.exports = {
    getAllSeats: function (con, callback) {
        con.query("SELECT * FROM seats", callback);
    },
    postSeat: function (con, callback) {
        con.query("INSERT INTO seats (status) VALUES ('available')", callback);
    },
    reserveSeat: (seatId, con, callback) => {
        con.query('SELECT * FROM seats WHERE id = ? AND status = "available"', [seatId], callback)
    },
    updateToReserved: (seatId, userId, con, callback) => {
        con.query('UPDATE seats SET status = "reserved", userId = ? WHERE id = ?', [userId, seatId], callback)
    }
}
