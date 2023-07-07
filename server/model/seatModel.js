module.exports = {
    getAllSeats: function (con, callback) {
        con.query("SELECT * FROM seats", callback);
    },

}
