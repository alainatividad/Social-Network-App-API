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

const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }

    res.json(thought);
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
      return res.status(404).json({ message: "No user with that ID" });
    }

    const thought = await Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });

    const userUpdate = await User.updateOne(
      {
        _id: req.body.userId,
      },
      { $addToSet: { thoughts: ObjectId(thought._id) } },
      { runValidators: true, new: true }
    );
    res.json(userUpdate);
  } catch (error) {
    res.status(500).json(error);
  }
};

const modifyThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }

    const updateThought = await Thought.updateOne(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    res.json(updateThought);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({
      _id: req.params.thoughtId,
    });

    if (!thought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }

    await Thought.deleteOne({
      _id: req.params.thoughtId,
    });

    const updateUser = await User.findOneAndUpdate(
      {
        thoughts: req.params.thoughtId,
      },
      { $pull: { thougths: req.params.thoughtId } },
      { new: true }
    );

    res.json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }

    const updateThought = await Thought.updateOne(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    res.json(updateThought);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteReaction = async (req, res) => {
  try {
    const thought = await Thought.findOne({
      _id: req.params.thoughtId,
      "reactions.reactionId": req.params.reactionId,
    });

    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thought and/or reactions with that ID" });
    }

    const updateThought = await Thought.updateOne(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    res.json(updateThought);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllThoughts,
  getSingleThought,
  createThought,
  addReaction,
  modifyThought,
  deleteThought,
  deleteReaction,
};
