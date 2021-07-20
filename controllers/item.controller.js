const {Item} = require('../models/item.model');
const ItemService = require('../services/item.service');
exports.getAllItems = async (req, res, next)=>{
  try {
      
  // const reqObj= req
  const existingItems = await Item.find({ });
  res.status(200).send({
      existingItems
      
    });
  } catch (error) {
   next(error)

  }

};
exports.findItem = async(req, res, next)=>{
    try {
        
    // const reqObj= req
    const existingItem = await ItemService.findById(req.params.id);
    res.status(200).send({
        existingItem
        
      });
    } catch (error) {
     next(error)

    }

};

exports.updateItem = async (req, res,next) => {
    try {
        //find an existing Item
  const existingItem = await ItemService.findById(req.params.id);
  const newItem = Object.assign({},existingItem,req.body);
  const updatedItem= await ItemService.updateItem(req.params.id, newItem);

  res.status(200).send({
      updatedItem
    
  });
    } catch (error) {
        next(error)
    }

  
};

exports.saveItem = async (req, res,next) => {
    try {
        
  //find an existing Item
  const existingItem = await Item.findOne({ name: req.body.name });
  if (existingItem) return res.status(400).send("Item already registered.");

  const newItem = new Item({
    name: req.body.name,
    Item_type: req.body.Item_type ||[],
    tax_rate:req.body.tax || 0,
    unit_price:req.body.unit_price ||0,
    clubbed_order_discount:req.body.clubbed_order_discount||[],

  });
  const savedItem= await newItem.save();

  res.status(200).send({
    savedItem
    
  });
    } catch (error) {
    next(error)
    }

}

exports.deleteItem = async (req, res,next) => {
  try {
      
//find an existing Item
const existingItem = await Item.findById( req.params.id );
if (! existingItem) return res.status(400).send("No Item  registered by name ", req.params.name);
const deletedItem= await Item.remove({_id:req.params.id})
res.status(200).send({
  deletedItem
  
});
  } catch (error) {
  next(error)
  }

}