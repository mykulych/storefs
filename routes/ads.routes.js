const express = require("express");
const Ad = require("../models/Ad");
const User = require("../models/User");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
const modifyAds = require("../utils/modifyAds.helper");

router.post("/collection", auth, async (req, res) => {
  try {
    const payload = req.body;

    const data = await Promise.all(
      payload.map(async (_id) => await Ad.find({ _id }))
    );

    const filteredData = data.filter((item) => item.length !== 0);
    const transformData = filteredData.map((item) => item[0]);
    const modifiedAds = await modifyAds(transformData);
    res.status(200).send(modifiedAds);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

router.get("/recently", async (req, res) => {
  try {
    const ads = await Ad.find();
    const modifiedAds = await modifyAds(ads);
    if (modifiedAds.length < 12) {
      res.status(200).send(modifiedAds);
    } else {
      const recentlyAds = modifiedAds.slice(0, 12);
      res.status(200).send(recentlyAds);
    }
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

router.get("/orders", auth, async (req, res) => {
  try {
    const ads = await Ad.find({ buyer: req.user._id });
    res.status(200).send(ads);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

router.patch("/sell", auth, async (req, res) => {
  try {
    const array = req.body;
    await array.forEach(
      async (item) =>
        await Ad.findByIdAndUpdate(
          item.id,
          { buyer: req.user._id },
          { new: true }
        )
    );

    const user = await User.findById(req.user._id);

    const wishlistPromise = user.wishlist?.map(async (id) => {
      const ad = await Ad.findById(id.toString());
      if (!ad?.buyer) {
        return id.toString();
      }
      return null;
    });
    const newWishlist = await Promise.all(wishlistPromise);
    const filteredWishlist = newWishlist.filter((item) => item);

    await User.findByIdAndUpdate(
      req.user._id,
      {
        cart: [],
        wishlist: filteredWishlist,
      },
      { new: true }
    );
    res.status(200).send(null);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

router.patch("/cancelSell", auth, async (req, res) => {
  try {
    const array = req.body;
    await array.forEach(
      async (item) =>
        await Ad.findByIdAndUpdate(item.id, { buyer: null }, { new: true })
    );
    res.status(200).send(null);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

router
  .route("/")
  .get(async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Ad.find({ [orderBy]: equalTo });

      const modifiedAds = await modifyAds(list);
      res.status(200).send(modifiedAds);
    } catch (error) {
      res.status(500).json({ message: `Server error: ${error}` });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newAd = await Ad.create({
        ...req.body,
        publisher: req.user._id,
      });

      res.status(201).send(newAd);
    } catch (error) {
      res.status(500).json({ message: `Server error: ${error}` });
    }
  });

router
  .route("/:_id")
  .patch(auth, async (req, res) => {
    try {
      const { _id } = req.params;
      const ad = await Ad.findOne({ _id });
      const user = await User.findById(req.user._id);

      if (ad.publisher.toString() === req.user._id || user.role === "admin") {
        const updatedAd = await Ad.findByIdAndUpdate(
          _id,
          { ...req.body, publisher: ad.publisher },
          { new: true }
        );
        res.status(200).send(updatedAd);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      res.status(500).json({ message: `Server error: ${error}` });
    }
  })
  .delete(auth, async (req, res) => {
    try {
      const { _id } = req.params;
      const ad = await Ad.findOne({ _id });
      const user = await User.findById(req.user._id);

      if (!ad) {
        return res.status(404).json({ message: "NOT_FOUND" });
      }

      if (ad.publisher.toString() !== req.user._id && user.role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
      }

      await ad.remove();

      const comments = await Comment.find({ parentId: _id });
      if (comments.length) {
        comments.forEach((item) => item.remove());
      }
      return res.send(null);
    } catch (error) {
      res.status(500).json({ message: `Server error: ${error}` });
    }
  });

module.exports = router;
