const  { Order } = require('../models/order.model');
const mongoose = require('mongoose');
const {saveInvoice , updateInvoice,updateInvoiceStatus} = require('../services/invoice.service')
const {OrderStatuses, InvoiceStatuses} = require('../dictionary/constants')
const _this=this;

exports.saveOrder= async (req)=>{
    try 
        {
        // extract the details of the order from the request body
        // To do santize by regex for production
        const customerId= req.body.customerId;
        const orderItems = req.body.orderItems;
        const orderTTC= req.body.orderTTC;
        const OrderDetails= Object.assign({},{customer_id:customerId,order_ttc:orderTTC, order_items : orderItems, order_status:OrderStatuses.accepted});
        // save order in the order collection in database
        const savedOrderDetails = await Order.create({...OrderDetails});

        // save the order invoice in the invoice collection in the database

        const savedInvoice = await saveInvoice(savedOrderDetails)

        return savedInvoice;
        
    } 
    catch (error) {
        throw (error)
    }
    

};

exports.updateOrder= async (order)=>{
    try 
    
        {
        const orderDetails = await Order.findById(order._id).lean().exec();    
        const customerId= order.customerId;
        const orderItems = order.orderItems;
        const orderTTC= order.orderTTC;
        OrderDetails= Object.assign({},OrderDetails,{customer_id:customerId,order_ttc:orderTTC});
        const updatedOrderDetails = await Order.updateOne({_id:order.id},{$set:OrderDetails});

        const updatedInvoice = await updateInvoice(savedOrderDetails)

        return updatedInvoice;
        
    } catch (error) {
        throw (error)
    }
    

};

exports.updateOrderStatus= async (orderId, orderStatus) =>{
    try {
        const updatedOrder = Order.updateOne({order_id:orderId},{$set:{order_status:orderStatus}});
        return updatedOrder;
        
    } catch (error) {
        throw error
    }
}
exports.cancelOrder= async (orderId)=>{
    try 
    
        {
            //update the order status to cancelled
        const cancelledOrder = await _this.updateOrderStatus(orderId,OrderStatuses.cancelled);
        // update the invoice status to cancelled
        const cancelledInvoice = await updateInvoiceStatus(cancelledOrder.invoice_id, InvoiceStatuses.cancelled)   

        return cancelledOrder;
        
    } catch (error) {
        throw (error)
    }
    

};



