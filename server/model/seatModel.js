module.exports = {
    getAllSeats: (con, callback) => {
        con.query("SELECT * FROM seats", callback);
    },
    postSeat: (con, id, callback) => {
        con.query("INSERT INTO seats (id, status, userId, reserveDate) VALUES (id, 'available', null, null)", callback);
    },
    reserveSeat: (seatId, con, callback) => {
        con.query('SELECT * FROM seats WHERE id = ? AND status = "available"', [seatId], callback);
    },
    updateToReserved: (seatId, userId, con, callback) => {
        const now = new Date()
        con.query('UPDATE seats SET status = "reserved", userId = ?, reserveDate = ? WHERE id = ?', [userId, now, seatId], callback);
    },
    paySeats: (seatIds, userId, con, callback) => {
        con.query('SELECT * FROM seats WHERE id IN (?) AND status = "reserved"', [seatIds], callback);
    },
    updateToSold: (seatIds, userId, con, callback) => {
        const placeholders = seatIds.map(() => '(?)').join(', ');
        const params = [userId, ...seatIds];

        const query = `UPDATE seats
                       SET status      = "sold",
                           userId      = ?,
                           reserveDate = null
                       WHERE id IN (${placeholders})`;

        con.query(query, params, callback);
    },
    deleteAllSeats: (con, callback) => {
        const dropQuery = "DROP TABLE IF EXISTS seats";
        const createQuery =
            "CREATE TABLE seats (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, status VARCHAR(255) NOT NULL, userId INT, reserveDate DATE)";

        con.query(dropQuery, (error, result) => {
            if (error) {
                console.error("Error dropping seats table:", error);
                return callback(error);
            }

            con.query(createQuery, (error, result) => {
                if (error) {
                    console.error("Error creating seats table:", error);
                    return callback(error);
                }

                console.log("Seats table created successfully");
                callback(null, result);
            });
        });
    },
    reserveToAvailable: (seatIds, con, callback) => {
        console.log(seatIds)
        const placeholders = seatIds.length > 1 ? seatIds.map(() => "(?)").join(", ") : "(?)";

        const query = `UPDATE seats
                       SET status = "available",
                           userId = null
                       WHERE id IN (${placeholders})`;

        con.query(query, seatIds, callback);
    }
}
