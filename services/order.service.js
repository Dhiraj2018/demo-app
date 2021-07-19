const  { Order } = require('../models/order.model');
const mongoose = require('mongoose');
const ItemService = require('../services/item.service');
const _this=this;

exports.saveOrder= async (req)=>{
    try 
        {const customerId= req.body.customerId;
        const orderItems = req.body.orderItems;
        const orderTTC= req.body.orderTTC;
        const items_club_hashmap=await createClubItemDiscountMap(orderItems)
        const OrderDetails = await calOrderDiscountAndTotal(orderItems, items_club_hashmap, OrderDetails);
        OrderDetails= Object.assign({},OrderDetails,{customer_id:customerId,order_ttc:orderTTC});
        const savedOrderDetails = Order.save(OrderDetails);
        return savedOrderDetails;
        
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
        const items_club_hashmap=await createClubItemDiscountMap(orderItems)
        const OrderDetails = await calOrderDiscountAndTotal(orderItems, items_club_hashmap, OrderDetails);
        OrderDetails= Object.assign({},OrderDetails,{customer_id:customerId,order_ttc:orderTTC});
        const updatedOrderDetails = Order.update({_id:order.id},{$set:OrderDetails});
        return updatedOrderDetails;
        
    } catch (error) {
        throw (error)
    }
    

};

exports.deleteOrder= async (orderId)=>{
    try 
    
        {
        const deletedOrder = await Order.remove({_id:orderId},{multi:false});    
        return deletedOrder;
        
    } catch (error) {
        throw (error)
    }
    

};



async function createClubItemDiscountMap(orderItems) {
    try {
        const items_club_hashmap={}
        for (let item of orderItems) {
        let temp = await ItemService.findItemById(item.itemId);
        if (temp.items_club && temp.items_club.length > 0) {

            for (x of temp.items_club) {
                if (!items_club_hashmap[x.item_id_club]) {
                    items_club_hashmap[x.item_id_club] = x.discount_club;
                } else {
                    items_club_hashmap[x.item_id_club] = Math.max(x.discount_club, items_club_hashmap[x.item_id_club]);
                }
            }
    
        }
    }
        return items_club_hashmap;
    } catch (error) {
        throw error;
    }
};


async function calOrderDiscountAndTotal(orderItems, items_club_hashmap) {
    const OrderDetails={orderItems:[],orderTotal:0,discountTotal:0};
    try {
        for (let item of orderItems) {

            let temp = await ItemService.findItemById(item.itemId);
            let tempOrderItemDetail = { itemId: item.itemId, itemQty: item.qty, itemPrice: temp.unit_price, itemTax: temp.tax_rate };
            let itemDiscount = Math.max(temp.discount, (items_club_hashmap[item.itemId] ? items_club_hashmap[item.itemId] : 0));
            tempOrderItemDetail.itemDiscount = itemDiscount;
            let itemTotalWithoutTax = Number(Number((100 - itemDiscount) * item.qty * temp.unit_price / 100).toFixed(2));
            tempOrderItemDetail.itemTotalWithTax = Number(Number(itemTotalWithoutTax - (0.01 * temp.tax_rate * itemTotalWithoutTax)).toFixed(2));
           
            OrderDetails.orderTotal += Number(tempOrderItemDetail.itemTotalWithTax);
            OrderDetails.discountTotal += Number(Number(0.01 * itemDiscount * item.qty * temp.unit_price).toFixed(2));
            OrderDetails.orderItems.push(tempOrderItemDetail);
    
    
    
        }
        return OrderDetails;
    } catch (error) {
       throw error; 
    }
   
};



