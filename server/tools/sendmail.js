const nodemailer = require('nodemailer');

const mailSender = async (props) => {
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
        to: props.userEmail,
        subject: 'Payment Confirmation - Express Cinema',
        html: "<h1>Payment Confirmation</h1>" +
            "<p>Dear customer,</p>" +
            `<p>Thank you for your payment for seat ${props.seatId} at Express Cinema.</p>` +
            " <p>We are pleased to confirm that your payment has been successfully processed.</p>" +
            "<p>Details of your reservation:</p>" +
            `<p>Seat ID: ${props.seatId}</p>` +
            "<p>Please keep this information for your reference.</p>" +
            "<p>Should you have any questions or require further assistance, feel free to contact our support team.</p>" +
            "<p>Thank you for choosing Express Cinema. We look forward to serving you.</p>" +
            " <p>Best regards,</p>" +
            "<p>The Express Cinema Team</p>"
    };
    try {
        await transporter.sendMail(mail);
        return 'success';
    } catch (error) {
        console.error(error);
        return 'error';
    }
}

module.exports = mailSender;