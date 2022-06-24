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
    const user = await User.findOne({ _id: req.params.userId })
      .select("-__v")
      .lean();

    if (!user) {
      res.json(404).json({ message: "No user with that ID" });
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
    const user = await User.findOne({ _id: req.params.userId })
      .select("-__v")
      .lean();

    const newFriend = await User.findOne({ _id: req.params.friendId })
      .select("-__v")
      .lean();

    if (!user || !newFriend) {
      res.json(404).json({ message: "No user with that ID" });
    }

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
