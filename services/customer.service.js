const { Customer } = require('../models/customer.model');
const bcrypt = require("bcrypt");



exports.findCustomerById= async (id)=>{
    try {
        return  await Customer.findById(id).select("-password").lean().exec();
    } catch (error) {
        throw error
    }
};
exports.findCustomer= async (query)=>{
    try {
        return  await Customer.find(query).lean().exec();
    } catch (error) {
        throw error
    }
}


exports.saveCustomer= async (input) =>{
    try {
      const customer = new Customer({
            name: input.name,
            password: input.password,
            email: input.email
        });
        customer.password = await bcrypt.hash(customer.password, 10);
        return await customer.save();
    } catch (error) {
        throw error
    }
}