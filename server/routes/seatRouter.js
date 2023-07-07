const {Router} = require("express");
require('dotenv').config();
const seatController = require("../controller/seatController")
const router = new Router();

router.get("/", seatController.getAllSeats)
module.exports = router;