const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createThought = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.userId,
    });
    if (!user) {
      res.status(404).json({ message: "No user with that ID" });
    }

    let thoughtId;
    const newThought = await Thought.create(
      {
        thoughtText: req.body.thoughtText,
        username: req.body.username,
      },
      (error, thought) => {
        if (error) {
          res.status(404).json(error);
        }
        thoughtId = thought._id;
      }
    );

    const updateUser = await User.findOneAndUpdate(
      {
        _id: req.body.userId,
      },
      { $addToSet: { thoughts: ObjectId(thoughtId) } },
      { runValidators: true, new: true }
    );

    res.json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllThoughts,
  createThought,
};
