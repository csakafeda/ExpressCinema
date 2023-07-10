const {Router} = require("express");
require('dotenv').config();
const seatController = require("../controller/seatController")
const router = new Router();

router.get("/", seatController.getAllSeats);
router.post("/add_seat", seatController.postSeat);
router.post("/reserve", seatController.reserveSeat);
router.post("/reserve_expire", seatController.reserveExpire);
router.post("/pay", seatController.paySeats);
router.delete("/delete_all", seatController.deleteAllSeats);

module.exports = router;