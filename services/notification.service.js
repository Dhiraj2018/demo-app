
const webpush = require('web-push');

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
webpush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);

exports.sendNotifications =async (subscription,payload) => {
    try {
        return await webpush.sendNotification(subscription, payload)
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
    