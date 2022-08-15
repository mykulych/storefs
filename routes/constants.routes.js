const express = require("express");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.get("/categories", async (req, res) => {
  try {
    const list = await Category.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/subcategories", async (req, res) => {
  try {
    const { orderBy, equalTo } = req.query;
    let list;
    if (orderBy && equalTo) {
      list = await Subcategory.find({ [orderBy]: equalTo });
    } else {
      list = await Subcategory.find();
    }
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

router.patch("/subcategories/:_id", auth, async (req, res) => {
  try {
    const { _id } = req.params;
    const subcategory = await Subcategory.findByIdAndUpdate(
      _id,
      { ...req.body },
      { new: true }
    );
    res.status(200).send(subcategory);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

module.exports = router;
