const mongoose = require("mongoose");

// setup
mongoose.connect(
  "mongodb+srv://9416sonusaini:bidu@cluster0.igkqpp7.mongodb.net/HimtVoucherData?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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
