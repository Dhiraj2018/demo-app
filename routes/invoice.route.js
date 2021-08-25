const express = require("express");
const router = express.Router();
const controller = require('../controllers/invoice.controller')
const auth= require('../middleware/auth')

router.get("/:orderId",auth,controller.getInvoiceByOrder);


  module.exports= router