const mongoose = require('mongoose');
const Counter = require('./counter.model');
const Customer = require('./customer.model');
const Schema= mongoose.Schema;

//simple schema
const opts = {
  createdAt: "created_at",
  updatedAt: "updated_at",
};
const InvoiceSchema = new mongoose.Schema({
    invoice_id: {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 50
      },
    order_id:{type:Schema.Types.ObjectId, ref: 'Order', required:true},
    order_items: [
        {itemId:{type:Schema.Types.ObjectId, ref: 'Item'},
        qty:{type:Number},
        itemDiscount:{type:Number, min:0, max:100},

    }],
    
      
    customer_id:{type:Schema.Types.ObjectId, ref: 'Customer', required:true},
    overall_discount:{type:Number, default:0},
    overall_tax_rate:{type:Number, default:0},
    invoice_total:{
      type:Number,
      required:true
  },
  invoice_status:{type:String}
},opts,{ timestamps: true }
);

  
/**
 * Invoice Schema presave 
 */
 InvoiceSchema.pre('save', function(next) {
    let doc = this;
  
 Counter.findByIdAndUpdate({_id: 'invSeq'},{$inc: { seq: 1}},{"upsert": true,"new": true  }, function(error, counter)   {
      if(error)
        return next(error);
      doc.invoice_id = counter.seq;
      next();
  });
});
const Invoice = mongoose.model('Invoice', InvoiceSchema);


exports.Invoice = Invoice; 