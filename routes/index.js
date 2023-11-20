const express = require("express");
const router = express.Router();
const User = require("../models/user");
const flash = require("connect-flash");

router.get("/", function (req, res) {
  res.render("voucher", { errorMessage: null });
});

// get whole data from database
router.get("/getDataFromDatabase", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json({ success: true, data: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/voucher", function (req, res) {
  res.render("voucher", { errorMessage: null });
});

router.get("/preview", function (req, res) {
  res.render("preview", { emptyMessage: null });
});

router.get("/sercheditem", async function (req, res) {
  const messages = req.flash();
  res.send(messages);
});

router.post("/search", async (req, res) => {
  try {
    const { searchInput } = req.body;
    if (searchInput.trim() === "") {
      return res.status(400).render("preview", {
        emptyMessage: "Please fill in all required fields.",
      });
    } else {
      const results = await User.find({
        $or: [
          { head: new RegExp(searchInput, "i") },
          { totalAmount: new RegExp(searchInput, "i") },
          { voucherDate: new RegExp(searchInput, "i") },
          // { voucher: new RegExp(searchInput, "i") },
        ],
      });
      req.flash("success", results);
      res.render("search", { results });
    }
  } catch (error) {
    console.error(error);
    req.flash("error", "Internal Server Error. Please try again later.");
    res.status(500).render("preview", {
      emptyMessage: "There is no data related to you query",
    });
  }
});

router.post("/", async function (req, res) {
  try {
    const {
      voucher,
      head,
      totalAmount,
      voucherDate,
      chequeNo,
      chequeDate,
      paymentType,
    } = req.body;

    let particularName = req.body.particular;
    let particularRupee = req.body.rupee;

    if (
      !voucher ||
      !head ||
      !totalAmount ||
      !voucherDate ||
      !paymentType ||
      !particularName ||
      !particularRupee
    ) {
      return res.status(400).render("voucher", {
        errorMessage: "Please fill in all required fields.",
      });
    }

    // this is about particular data conditions
    const particularData = [];
    const particularObject = {};

    if (!Array.isArray(particularName) && !Array.isArray(particularRupee)) {
      particularObject[particularName] = particularRupee;
    } else {
      for (let i = 0; i < particularName.length; i++) {
        particularObject[particularName[i]] = particularRupee[i];
      }
    }
    particularData.push(particularObject);

    // this is about voucher number
    const latestUserData = await User.findOne().sort({ voucher: -1 });

    if (latestUserData && voucher == latestUserData.voucher) {
      return res.status(400).render("voucher", {
        errorMessage: "Voucher number already exists!",
      });
    }

    // here we add our voucher data to backend
    const userData = new User({
      voucher,
      head,
      totalAmount,
      voucherDate,
      chequeDate,
      chequeNo,
      particularData,
      paymentType,
    });

    const registered = await userData.save();

    req.flash("newVoucher", voucher);
    req.flash("userData", userData);

    res.status(201).render("stored", { newVoucher: req.flash("newVoucher") });
  } catch (error) {
    res
      .status(400)
      .render("voucher", { errorMessage: "Something went wrong! Try again." });
  }
});

router.post("/remove", async (req, res) => {
  try {
    const { voucher, head } = req.body;

    const deletedVoucher = await User.findOneAndDelete({ voucher, head });

    if (deletedVoucher) {
      // Successfully deleted the voucher
      res.status(400).render("store", {
        success: true,
        emptyMessage: "Voucher deleted successfully",
      });
      return res.json({
        success: true,
        message: "Voucher deleted successfully",
      });
    } else {
      // Voucher not found
      return res
        .status(404)
        .json({ success: false, message: "Voucher not found" });
    }
  } catch (error) {
    console.error("Error deleting voucher:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

// Edit voucher
router.post("/editvoucher", async (req, res) => {
  const editedVoucherData = req.body.editedVoucherData;

  try {
    for (const item of editedVoucherData) {
      const voucher = item.voucherNumber; // VoucherNumber is the existing voucher number
      const head = item.voucherHead;
      const voucherDate = item.voucherDate;
      const particularData = item.particularData;
      const totalAmount = item.totalAmount;

      const editedVoucher = await User.findOneAndUpdate(
        { voucher }, // Search for the document based on the voucher number
        {
          $set: {
            head,
            voucherDate,
            particularData,
            totalAmount,
          },
        },
        { new: true }
      );

      console.log(editedVoucher);
    }

    res
      .status(200)
      .json({ success: true, message: "Voucher Updated Successfully" });
  } catch (error) {
    console.error("Error finding data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// router.get("/search/result", (req, res) => {
//   const successMessage = req.flash("success");
//   const errorMessage = req.flash("error");
//   // Render your result page and pass flash messages
//   res.render("searchResult", { successMessage, errorMessage });
// });

module.exports = router;
