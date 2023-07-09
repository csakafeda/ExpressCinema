const seatModel = require("../model/seatModel");
const nodemailer = require('nodemailer');

module.exports = {
    getAllSeats: function (req, res) {
        seatModel.getAllSeats(req.con, function (err, result) {
            res.json(result);
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
                return;
            }
            console.log(result)

            seatModel.updateToSold(seatId, userId, req.con, (err, updateResult) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({error: 'Failed to process payment.'});
                    return;
                }
                console.log(updateResult);

                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    post: 465,
                    secure: true,
                    auth: {
                        user: process.env.SENDING_EMAIL,
                        pass: process.env.EMAIL_PASSWORD,
                    }
                });

                const mail = {
                    from: process.env.SENDING_EMAIL,
                    to: userEmail,
                    subject: 'Payment Confirmation - Express Cinema',
                    html: "<h1>Payment Confirmation</h1>" +
                        "<p>Dear customer,</p>" +
                        "<p>Thank you for your payment for seat ${seatId} at Express Cinema.</p>" +
                        " <p>We are pleased to confirm that your payment has been successfully processed.</p>" +
                        "<p>Details of your reservation:</p>" +
                        `<p>Seat ID: ${seatId}</p>` +
                        "<p>Please keep this information for your reference.</p>" +
                        "<p>Should you have any questions or require further assistance, feel free to contact our support team.</p>" +
                        "<p>Thank you for choosing Express Cinema. We look forward to serving you.</p>" +
                        " <p>Best regards,</p>" +
                        "<p>The Express Cinema Team</p>"
                };

                transporter.sendMail(mail, (error) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({error: 'Failed to send email.'});
                        return;
                    }
                    res.json({message: 'Payment successful.'});
                });
            })
        })
    }
}