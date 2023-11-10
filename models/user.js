const mongoose = require("mongoose");

// setup
mongoose
  .connect("mongodb://127.0.0.1:27017/HimtData")
  .then(() => {
    console.log("Connected to backend");
  })
  .catch((error) => {
    console.log("Not connected");
  });

// mongoose
//   .connect(
//     "mongodb+srv://9416sonusaini:bidu@cluster0.igkqpp7.mongodb.net/HimtVoucherData?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.log("Not connected to MongoDB");
//   });

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
  particularData: {
    type: Object,
  },
});

// crete model
module.exports = mongoose.model("user", userSchema);
