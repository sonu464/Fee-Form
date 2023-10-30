const mongoose = require("mongoose");

// setup
mongoose.connect("mongodb://127.0.0.1:27017/HimtVoucherData");

// create schema
const userSchema = mongoose.Schema({
  voucher: {
    type: Number,
    required: true,
    unique: true,
  },
  head: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
  voucherDate: {
    type: String,
    required: true,
  },
  chequeDate: {
    type: String,
  },
  chequeNo: {
    type: String,
  },
});

// crete model
module.exports = mongoose.model("user", userSchema);
