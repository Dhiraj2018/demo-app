const  { Invoice } = require('../models/order.model');
const mongoose = require('mongoose');
const ItemService = require('../services/item.service');
const { InvoiceStatuses } =require('../dictionary/constants')
const _this=this;

 
/**
 * @description This method would generate the invoice for the particular order
 * @params orderDetails 
 * @returns generated Invoice 
 */
exports.saveInvoice= async (orderDetails)=>{
    try 
        {
        const customerId= orderDetails.customer_id
        const orderId= orderDetails.order_id
        const orderItems = orderDetails.order_items;
        const invoiceStatus= InvoiceStatuses.new;
        const items_club_hashmap = await createClubItemDiscountMap(orderItems)
        let invoiceDetails = await calOrderDiscountAndTotal(orderItems, items_club_hashmap, OrderDetails);
        invoiceDetails= Object.assign({},invoiceDetails,{customer_id:customerId,order_id:orderId, invoice_status:invoiceStatus});
        // this method would create the invoice
        const savedInvoiceDetails = await Invoice.create({...savedInvoiceDetails});
        return savedInvoiceDetails;
        
    } 
    catch (error) {
        throw (error)
    }
    

};
/**
 * @description This method would update the invoice status;
 * @param {*} orderID 
 * @param {*} invoiceStatus 
 * @returns object of the updated invoice
 */
exports.updateInvoiceStatus = async ( invoiceId, invoiceStatus)=>{
    try {
        const updatedInvoiceDetails =await Invoice.update({invice_id:invoiceId},{$set:{invoice_status:invoiceStatus}});
        return updatedInvoiceDetails
    } catch (error) {
        throw (error);
    }
    
};


/**
 * 
 * @param {*} orderDetails 
 * @returns updated Invoice Object;
 */
exports.updateInvoice= async (orderDetails)=>{
    try 
    
        {
        const customerId= orderDetails.customerId;
        const orderItems = orderDetails.orderItems;
        const orderTTC= order.orderTTC;
        const items_club_hashmap=await createClubItemDiscountMap(orderItems)
        let invoiceDetails = await calOrderDiscountAndTotal(orderItems, items_club_hashmap, OrderDetails);
        invoiceDetails= Object.assign({},invoiceDetails,{customer_id:customerId,order_ttc:orderTTC,invoice_status: InvoiceStatuses.modified});
        const updatedInvoiceDetails = await Invoice.update({invoice_id: orderDetails.invoice_id},{$set:invoiceDetails});
        return updatedInvoiceDetails;
        
    } catch (error) {
        throw (error)
    }
    

};
/**
 * @description This method would cancel the invoice
 * @param {*} invoiceId 
 * @returns 
 */
exports.cancelInvoice= async (invoiceId)=>{
    try 
    
        {
        const cancelledOrder = await _this.updateInvoiceStatus(invoiceId , InvoiceStatuses.cancelled);    
        return cancelledOrder;
        
    } catch (error) {
        throw (error)
    }
    

};

exports.getInvoiceByOrder = async (orderId)=>{
    try {
        return await await Invoice.find({order_id:{$eq:orderId}}).lean(); 
    }
        
    catch (error) {
        throw error;   
    }
}
/**
 * @description This method would take the list of the order items and return the max discount applied in each order
 * @param {*} orderItems 
 * @returns Object 
 * items_club_hashmap {
 * <ItemId1>: <MaxDiscount>
 * <ItemId2>: <MaxDiscount>
 * <ItemId3>: <MaxDiscount>
 * 
 * }
 */
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

/**
 *@description:This method would take the order items and the order items hashmap as the input and aggregate the order total and the discount total along with max discount against each order 
 * @param {*} orderItems 
 * @param {*} items_club_hashmap 
 * @returns 
 */
async function calOrderDiscountAndTotal(orderItems, items_club_hashmap) {
    const invoiceDetails={orderItems:[],orderTotal:0,discountTotal:0};
    try {
        for (let item of orderItems) {

            let temp = await ItemService.findItemById(item.itemId);
            let tempOrderItemDetail = { itemId: item.itemId, itemQty: item.qty, itemPrice: temp.unit_price, itemTax: temp.tax_rate };
            let itemDiscount = Math.max(temp.discount, (items_club_hashmap[item.itemId] ? items_club_hashmap[item.itemId] : 0));
            tempOrderItemDetail.itemDiscount = itemDiscount;
            let itemTotalWithoutTax = Number(Number((100 - itemDiscount) * item.qty * temp.unit_price / 100).toFixed(2));
            tempOrderItemDetail.itemTotalWithTax = Number(Number(itemTotalWithoutTax - (0.01 * temp.tax_rate * itemTotalWithoutTax)).toFixed(2));
           
            invoiceDetails.orderTotal += Number(tempOrderItemDetail.itemTotalWithTax);
            invoiceDetails.discountTotal += Number(Number(0.01 * itemDiscount * item.qty * temp.unit_price).toFixed(2));
            invoiceDetails.orderItems.push({
               itemId: tempOrderItemDetail.itemId,
                qty: tempOrderItemDetail.itemQty,
                itemDiscount: tempOrderItemDetail.itemDiscount
            });
    
    
    
        }
        return invoiceDetails;
    } catch (error) {
       throw error; 
    }
   
};



