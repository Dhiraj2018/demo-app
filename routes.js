const auth = require('./middleware/auth');
module.exports = function (app) {
    app.use("/api/customer",auth, require("./routes/customer.route"));
    app.use("/api/item",auth,  require("./routes/item.route"));         
    app.use("/api/order", auth, require("./routes/order.route"));
    app.use("/api/notification", auth, require("./routes/notification.route"));
    app.use("/api/invoice", auth, require("./routes/invoice.route"));
};