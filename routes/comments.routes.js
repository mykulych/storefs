const express = require("express");
const auth = require("../middleware/auth.middleware");
const Comment = require("../models/Comment");
const User = require("../models/User");
const sort = require("../utils/sort.helper");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Comment.find({ [orderBy]: equalTo });
      const sortedList = sort(list);
      res.status(200).send(sortedList);
    } catch (error) {
      res.status(500).json({ message: `Server error: ${error}` });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        publisher: req.user._id,
      });
      res.status(201).send(newComment);
    } catch (error) {
      res.status(500).json({ message: `Server error: ${error}` });
    }
  });

router.delete("/:commentId", auth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    const user = await User.findById(req.user._id);

    if (
      comment.publisher.toString() === req.user._id ||
      user.role === "admin"
    ) {
      await comment.remove();
      res.send(null);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

module.exports = router;
