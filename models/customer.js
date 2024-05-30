const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const CustomerModel = mongoose.model( 'Customer',customerSchema);
module.exports = CustomerModel;
