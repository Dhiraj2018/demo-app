const auth = require("../middleware/auth");
const { Customer } = require("../models/customer.model");
const express = require("express");
const router = express.Router();
const controller = require('../controllers/customer.controller');

router.get("/current",controller.getCurrentUser )

router.post("/", controller.saveCustomer)

module.exports = router;