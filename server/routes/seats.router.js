const {Router} = require("express");
const nodemailer = require('nodemailer');

const seatRouter = (connection) => {
    const router = new Router();

    router.get("/", async (req, res) => {
        connection.query(`SELECT *
                          FROM seats`, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({error: 'Failed to fetch seats.'});
                return;
            }
            res.json(results);
        });
    });

    router.get("/available", (req, res) => {
        connection.query('SELECT * FROM seats WHERE status = "available"', (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({error: 'Failed to fetch available seats.'});
                return;
            }
            console.log(result);
            res.json(result);
        });
    })

    router.post('/reserve', (req, res) => {
        const seatId = parseInt(req.body.seatId);
        const userId = req.body.userId;

        connection.query('SELECT * FROM seats WHERE id = ? AND status = "available"', [seatId], (err, results) => {
            if (err){
                console.log(results);
                console.error(err);
                res.status(500).json({error: 'Failed to reserve the seat.'});
                return;
            }


            if (results.length === 0) {
                res.status(400).json({error: 'The seat cannot be reserved.'});
                return;
            }

            connection.query('UPDATE seats SET status = "reserved", userId = ? WHERE id = ?', [userId, seatId], (err, updateResult) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({error: 'Failed to reserve the seat.'});
                    return;
                }
                res.json({message: 'Reservation successful.'});
            });
        });
    });

    router.post('/pay', (req, res) => {
        const seatId = parseInt(req.body.seatId);
        const userId = parseInt(req.body.userId);
        const userEmail = req.body.email;

        connection.query('SELECT * FROM seats WHERE id = ? AND status = "reserved"', [seatId], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({error: 'Failed to process payment.'});
                return;
            }

            if (results.length === 0) {
                res.status(400).json({error: 'The seat cannot be paid for.'});
                return;
            }

            connection.query('UPDATE seats SET status = "sold", userId = ? WHERE id = ?', [userId, seatId], (err, updateResult) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({error: 'Failed to process payment.'});
                    return;
                }

                // TODO: Implement email sending using Nodemailer
                res.json("Payment successful")
            });
        });
    });

    router.post("/add_seat", async (req, res) => {
        const query = "INSERT INTO seats (status) VALUES ('available')";

        connection.query(query, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({error: "Failed to add the seat."});
                return;
            }
            const newSeatId = result.insertId;
            res.json({id: newSeatId, status: "available"});
        });
    });
    return router;
};

module.exports = seatRouter;
