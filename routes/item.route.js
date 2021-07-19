const express = require("express");
const router = express.Router();
const controller = require('../controllers/item.controller')
const auth= require('../middleware/auth')

router.get("/",auth,controller.getAllItems);
router.get("/:id",auth,controller.findItem);
router.put("/:id",auth,controller.updateItem);
router.delete("/:id",auth,controller.deleteItem);
router.post("/save",auth, controller.saveItem);
  



  module.exports= router