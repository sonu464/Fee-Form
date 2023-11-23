const mongoose = require("mongoose");
const flash = require("connect-flash");

// setup
// mongoose
//   .connect("mongodb://127.0.0.1:27017/HimtData")
//   .then(() => {
//     console.log("Connected to backend");
//   })
//   .catch((error) => {
//     console.log("Not connected");
//   });

mongoose
  .connect(
    "mongodb+srv://bidu:bidumongo@cluster0.z8ql8z4.mongodb.net/HimtVoucher?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Not connected to MongoDB");
  });

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
    type: Number,
  },
  particularData: {
    type: Object,
  },
  paymentType: {
    type: String,
  },
});

// crete model
module.exports = mongoose.model("user", userSchema);
