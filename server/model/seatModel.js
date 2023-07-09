module.exports = {
    getAllSeats: (con, callback) => {
        con.query("SELECT * FROM seats", callback);
    },
    postSeat: (con, callback) => {
        con.query("INSERT INTO seats (status) VALUES ('available')", callback);
    },
    reserveSeat: (seatId, con, callback) => {
        con.query('SELECT * FROM seats WHERE id = ? AND status = "available"', [seatId], callback);
    },
    updateToReserved: (seatId, userId, con, callback) => {
        con.query('UPDATE seats SET status = "reserved", userId = ? WHERE id = ?', [userId, seatId], callback);
    },
    paySeats: (seatId, userId, con, callback) => {
        con.query('SELECT * FROM seats WHERE id = ? AND status = "reserved"', [seatId], callback);
    },
    updateToSold: (seatId, userId, con, callback) => {
        con.query('UPDATE seats SET status = "sold", userId = ? WHERE id = ?', [userId, seatId], callback);
    },
    deleteAllSeats: function (con, callback) {
        con.query("DELETE FROM seats", callback);
    }
}
