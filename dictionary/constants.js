/**
 * order states/Statuses
 */
const OrderStatuses={
    accepted:'Accepted',
    processing:'Processeing',
    outForDelivery:'Delivery',
    completed:'Completed',
    cancelled:'Cancelled',
    changed:'Changed'
}
/**
 * 
 * invoice states/Statuses
 */
const InvoiceStatuses={
    new:'New',
    processing:'Paid',
    modified:'Modified',
    underApproval:'UnderApproval',
    cancelled:'Cancelled',
    paid:'Paid'
}


module.exports ={ OrderStatuses:OrderStatuses, InvoiceStatuses:InvoiceStatuses}