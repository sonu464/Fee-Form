const express = require("express");
const router = express.Router();
const User = require("../models/user");
const flash = require("connect-flash");

router.get("/", function (req, res) {
  res.render("voucher", { errorMessage: null });
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
      // Check if any of the required fields are empty and render the "voucher" view with an error message
      return res.status(400).render("voucher", {
        errorMessage: "Please fill in all required fields.",
      });
    }

    const particularData = [];

    for (let i = 0; i < particularName.length; i++) {
      const combinedObject = {
        [particularName[i]]: particularRupee[i],
      };
      particularData.push(combinedObject);
    }

    const latestUserData = await User.findOne().sort({ voucher: -1 });

    if (latestUserData && voucher == latestUserData.voucher) {
      return res.status(400).render("voucher", {
        errorMessage: "Voucher number already exists!",
      });
    }

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

    res.status(201).render("stored", { newVoucher: req.flash("newVoucher") });
  } catch (error) {
    res
      .status(400)
      .render("voucher", { errorMessage: "Something went wrong! Try again." });
  }
});

let voucherDataArray = [];
router.post("/remove", (req, res) => {
  const { voucher, head } = req.body;

  voucherDataArray = voucherDataArray.filter(
    (item) => item.voucher !== voucher
  );
  res.json({ success: true, message: "Voucher deleted successfully" });
});

module.exports = router;
