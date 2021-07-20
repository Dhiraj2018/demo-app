const NotificationService = require('../services/notification.service');

exports.subscribe = async (req, res, next)=>{
try {
        // Get pushSubscription object
        const subscription = req.body;
      
        // Send 201 - resource created
        res.status(201).json({});
      
        // Create payload
        const payload = JSON.stringify({ title: "Push Test" });
      
        // Pass object into sendNotification
        return NotificationService.sendNotifications(subscription, payload)
    
} catch (error) {
    next(error)
}
};