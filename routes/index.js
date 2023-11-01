const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Replace with your actual model

/* GET home page. */
router.get("/", function (req, res) {
  // Render the "index" view without any error message
  res.render("voucher", { errorMessage: null });
});

router.get("/voucher", function (req, res) {
  // Render the "index" view without any error message
  res.render("voucher", { errorMessage: null });
});

router.post("/", async function (req, res) {
  try {
    const { voucher, head, totalAmount, voucherDate, chequeNo, chequeDate } =
      req.body;

    if (
      !voucher ||
      !head ||
      !totalAmount ||
      !voucherDate ||
      !chequeNo ||
      !chequeDate
    ) {
      // Check if any of the required fields are empty and render the "index" view with an error message
      return res.status(400).render("voucher", {
        errorMessage: "Please fill in all required fields.",
      });
    }

    const userData = User({
      voucher,
      head,
      totalAmount,
      voucherDate,
      chequeDate,
      chequeNo,
    });

    const registered = await userData.save();
    res.status(201).render("stored");
  } catch (error) {
    res
      .status(400)
      .render("index", { errorMessage: "something went wrong! try again" });
  }
});

module.exports = router;
