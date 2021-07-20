
require('dotenv').config()

const config = require("config");
const mongoose = require("mongoose");
const customersRoute = require("./routes/customer.route");
const express = require("express");
const app = express();
const cors = require('cors');
const path =require('path')
  
app.use(cors())

         

app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));


const webpush = require('web-push');

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
webpush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);


// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});


//use customers route for api/customers
//use config module to get the privatekey, if no private key set, end the application
if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
} 
app.get('/', (req, res) => {
  res.send('We are on HomePage')
});
require("./routes")(app);


app.post('/notifications/subscribe', (req, res) => {
  const subscription = req.body

  console.log(subscription)

  const payload = JSON.stringify({
    title: 'Hello!',
    body: 'It works.',
  })

  webpush.sendNotification(subscription, payload)
    .then(result => console.log(result))
    .catch(e => console.log(e.stack))

  res.status(200).json({'success': true})
});

//connect to mongodb
mongoose
  .connect("mongodb://localhost/nodejsauth", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));



 
          

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}...`));