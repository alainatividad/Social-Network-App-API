const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-__v");
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get one user
const getSingleUser = async (req, res) => {
  try {
    //check if passed userId exists
    const user = await User.findOne({ _id: req.params.userId });

    //if not, return 404 error
    if (!user) {
      return res.status(404).json({ message: "No user with that ID" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addFriend = async (req, res) => {
  try {
    //check if both user and friend exist
    const user = await User.findOne({ _id: req.params.userId });

    const newFriend = await User.findOne({ _id: req.params.friendId });

    //if either doesn't exist, don't continue with adding and return error
    if (!user || !newFriend) {
      return res.status(404).json({ message: "No user with that ID" });
    }

    //else update user's friends array with the friendId
    const updateUser = await User.updateOne(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );

    res.json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  addFriend,
};
