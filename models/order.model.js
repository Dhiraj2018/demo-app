const mongoose = require('mongoose');
const Counter = require('./counter.model');
const Schema= mongoose.Schema;

//simple schema
const opts = {
  createdAt: "created_at",
  updatedAt: "updated_at",
};
const OrderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  invoice_id:{
    type:Schema.Types.ObjectId, ref: 'Invoice', required:true
  },
  customer_id:{type:Schema.Types.ObjectId, ref: 'Customer', required:true},
  order_items: [
      {itemId:{type:Schema.Types.ObjectId, ref: 'Item'},
      qty:{type:Number}
  }
    ],
  order_status:{type:String},

  order_ttc:{type:Number, default: 1} //order time to complete in minutes
},  opts,{ timestamps: true }
);

  
/**
 * Order Schema presave 
 */
OrderSchema.pre('save', function(next) {
    let doc = this;
  
 Counter.findByIdAndUpdate({_id: 'orderSeq'},{$inc: { seq: 1}},{"upsert": true,"new": true  }, function(error, counter)   {
      if(error)
        return next(error);
      doc.order_id = counter.seq;
      next();
  });
});
const Order = mongoose.model('Order', OrderSchema);


exports.Order = Order; 