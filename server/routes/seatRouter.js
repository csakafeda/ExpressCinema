const {Router} = require("express");
require('dotenv').config();
const seatController = require("../controller/seatController")
const router = new Router();

router.get("/", seatController.getAllSeats);
router.post("/add_seat", seatController.postSeat);
router.post("/reserve", seatController.reserveSeat);
router.post("/pay", seatController.paySeats);

//TODO to buy more than 1 seat
// router.get("/:id", userController.getAllReservedSeats);

module.exports = router;