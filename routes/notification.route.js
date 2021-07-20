const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const controller = require('../controllers/notification.controller');


router.post("/subscribe", controller.subscribe) 

module.exports = router;

  