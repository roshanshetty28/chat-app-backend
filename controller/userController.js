const Auth = require("../model/authModel");
const asyncHandler = require("express-async-handler");

const searchUser = asyncHandler(async (req, res) => {
  const search = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { userID: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await Auth.find(search).select(
    "-password -createdAt -updatedAt -__v"
  );
  res.status(200).json(users);
});

const deleteAccount = asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id) {
    try {
      await Auth.findByIdAndDelete(req.user.id);
      return res.status(200).json("Account Deleted Successfully");
    } catch (error) {
      throw new Error(error);
    }
  }
  res.status(400);
  throw new Error("Invalid Action");
});

module.exports = {
  searchUser,
  deleteAccount,
};
