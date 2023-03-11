const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { searchUser, deleteAccount } = require("../controller/userController");

const router = express.Router();

router.post("/all-users", searchUser);
router.delete("/delete-acc/:id", protect, deleteAccount);

module.exports = router;
