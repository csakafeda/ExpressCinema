module.exports = {
    getAllSeats: function (con, callback) {
        con.query("SELECT * FROM seats", callback);
    },
    postSeat: function (con, callback) {
        con.query("INSERT INTO seats (status) VALUES ('available')", callback);
    }
}
