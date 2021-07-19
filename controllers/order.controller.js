const {Order} = require('../models/order.model');
const { Item } = require('../models/item.model');
const mongoose = require('mongoose');
const ItemService = require('../services/item.service');
const OrderService = require('../services/order.service');

exports.getOrdersByCustomer= async(req, res, next)=>{
    try {
    const customerId= req.params.customerId;
    const  orderList = await Order.find({customer_id:{$eq:customerId}}).lean(); 
    res.status(200).send({
        orderList
    })
    } catch (error) {
        next(error)
    }
};

exports.saveOrder= async(req, res, next)=>{
    try {
        const savedOrder = await OrderService.saveOrder(req);
        res.status(200).send({
            savedOrder
        })


    } catch (error) {
        next(error)
    }
};

exports.updateOrder= async(req, res, next)=>{
    try {
        const updateOrder = await OrderService.updateOrder(req.body.order);
        res.status(200).send({
            updateOrder
        })


    } catch (error) {
        next(error)
    }
};

exports.deletedOrder= async(req, res, next)=>{
    try {
        const deletedOrder = await OrderService.deleteOrder(req.body.id);
        res.status(200).send({
            deletedOrder
        })


    } catch (error) {
        next(error)
    }
};
