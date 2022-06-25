const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  addFriend,
  modifyUser,
  deleteUser,
  deleteFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(modifyUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
