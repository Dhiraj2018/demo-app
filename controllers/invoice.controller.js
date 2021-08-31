const {Order} = require('../models/order.model');
const { Item } = require('../models/item.model');
const mongoose = require('mongoose');
const InvoiceService = require('../services/invoice.service');

exports.getInvoiceByOrder= async(req, res, next)=>{
    try {
    const orderId = req.params.orderId;
    const  invoice = await InvoiceService.getInvoiceByOrder(orderId)
    res.status(200).send({
        invoice
    })
    } catch (error) {
        next(error)
    }
};

