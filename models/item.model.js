const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema= mongoose.Schema;

//item schema
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true
  },
  item_type: [
    {type: String,
    required: true,
    minlength: 5,
    maxlength: 255
    }
  ],
  tax_rate: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default:0
  },
  unit_price:{
      type:Number,
      required:true,
      default:0
  },
  discount:{type:Number, required:false,min:0, max:100},
  items_clubs:[
       { item_id_club:{type:Schema.Types.ObjectId, ref: 'Item' }, 
         discount_club:{type:Number, required:false,min:0, max:100}}
    ],
  isActive:{type:Boolean, default:true}
});

const Item = mongoose.model('Item', ItemSchema);


exports.Item = Item; 