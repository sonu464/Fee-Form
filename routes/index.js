var express = require("express");
var router = express.Router();
const User = require("../models/user");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});

router.get("/index", function (req, res) {
  res.render("index");
});

router.post("/", async function (req, res) {
  try {
    const userData = new User({
      voucher: req.body.voucher,
      head: req.body.head,
      totalAmount: req.body.totalAmount,
      voucherDate: req.body.voucherDate,
      chequeDate: req.body.chequeDate,
      chequeNo: req.body.chequeNo,
    });

    const registered = await userData.save();
    res.status(201).render("stored");
  } catch (error) {
    res.status(400).send("Error occurred");
  }
});

module.exports = router;
