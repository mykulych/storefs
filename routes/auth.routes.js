const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const tokenService = require("../services/token.service");
const router = express.Router({ mergeParams: true });
const { check, validationResult } = require("express-validator");

router.post("/signUp", [
  check("email", "Email was entered incorrectly").isEmail(),
  check("password", "Password was entered incorrectly").isLength(6),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: { message: "INVALID_DATA", code: 400 } });
      }

      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: { message: "EMAIL_EXISTS", code: 400 } });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });

      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);

      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (error) {
      res.status(500).json({ message: `Server error: ${error}` });
    }
  },
]);

router.post("/signInWithPassword", [
  check("email", "Email was entered incorrectly").isEmail(),
  check("password", "Passowrd was entered incorrectly").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: { message: "INVALID_DATA", code: 400 } });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ error: { message: "EMAIL_NOT_FOUND", code: 400 } });
      }

      const isPasswordEqual = await bcrypt.compare(password, user.password);

      if (!isPasswordEqual) {
        return res
          .status(400)
          .json({ error: { message: "INVALID_PASSWORD", code: 400 } });
      }

      const tokens = tokenService.generate({ _id: user._id });
      await tokenService.save(user._id, tokens.refreshToken);

      res.status(200).send({ ...tokens, userId: user._id });
    } catch (error) {
      res.status(500).json({ message: `Server error: ${error}` });
    }
  },
]);

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: "Unuthorized" });
    }

    const tokens = tokenService.generate({ _id: data._id });
    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

module.exports = router;
