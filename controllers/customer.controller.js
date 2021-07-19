const {Customer} = require('../models/customer.model');
const CustomerSerivce = require('../services/customer.service');
exports.getCurrentUser= async (req, res,next) => {
    try {
        const customer =  await CustomerSerivce.findCustomerById(req.query._id);
        res.status(200).send(customer.toJSON());
        
    } catch (error) {
    next(error)
    }
      };

exports.saveCustomer= async (req, res, next) => {
    try {
        //find an existing customer
        const query={ email: req.body.email }
        let customer = await CustomerService.findCustomer(query);
        if (customer) return res.status(400).send("Customer already registered.");
        
        const savedCustomer= await CustomerSerivce.saveCustomer(req.body);
        
        const token = savedCustomer.generateAuthToken();
        res.header("x-auth-token", token).send({
            _id: savedCustomer._id,
            name: savedCustomer.name,
            email: savedCustomer.email,
            
        });
        
    } catch (error) {
        next(error)
    }


};

