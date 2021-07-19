const { Item } =require('../models/item.model');
exports.findItemById= async (id)=>{
    try {
        return await Item.findById(item.itemId).lean().exec();
        
    } catch (error) {
        throw error
    }
};

exports.updateItem= async (id, newItem)=>{
    try {
        return await Item.updateOne({ _id: req.params.id },{$set:newItem});

    } catch (error) {
        throw error
    }
}
