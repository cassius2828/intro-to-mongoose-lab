const mongoose = require("mongoose");
const COLLECTION_NAME = process.env.COLLECTION_NAME;

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const CustomerModel = mongoose.model( 'Customer',customerSchema);
module.exports = CustomerModel;
