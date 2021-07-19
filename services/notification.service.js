const webPush= require('webPush');
exports.sendNotifications =async (subscription,payload) => {
    try {
        return await webPush.sendNotification(subscription, payload)
    } catch (error) {
        throw error
    }
};

exports.registerNotification= async (timeMinutes, payload)=>{
    try {
        return setTimeout(() => {
            this.sendNotifications(subscription, payload.subscription, payload.body)
        }, timeMinutes*60*1000);
    } catch (error) {
        throw error

    }
}
    