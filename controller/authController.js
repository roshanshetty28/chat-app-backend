const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Auth = require("../model/authModel");
const { capitalize } = require("../utils/capitalize");
const { generateToken } = require("../utils/generateToken");

const login = asyncHandler(async (req, res) => {
  try {
    const user = await Auth.findOne({
      $or: [{ userID: req.body.ID }, { email: req.body.ID }],
    });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      res.status(200).json({
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const register = asyncHandler(async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await Auth.create({
      name: capitalize(req.body.name),
      email: req.body.email,
      password: hashedPassword,
      userID: req.body.userID,
    });
    res.status(200).json({
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = {
  login,
  register,
};
