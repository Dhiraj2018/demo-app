
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


//connect to mongodb
mongoose
  .connect("mongodb://localhost/nodejsauth", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));



 
          

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}...`));