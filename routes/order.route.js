const express = require("express");
const router = express.Router();
const controller = require('../controllers/order.controller')
const auth= require('../middleware/auth')

router.post("/save",controller.saveOrder);
router.post("/update",controller.updateOrder);
router.delete("/:id",controller.deletedOrder);
router.get("/:customerId",auth,controller.getOrdersByCustomer);


  module.exports= router