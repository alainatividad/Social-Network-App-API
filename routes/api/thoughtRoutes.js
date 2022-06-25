const router = require("express").Router();
const {
  getAllThoughts,
  // getSingleThought,
  createThought,
  // addReaction,
} = require("../../controllers/thoughtController");

// /api/Thoughts
router.route("/").get(getAllThoughts).post(createThought);

// // /api/Thoughts/:ThoughtId
// router.route("/:ThoughtId").get(getSingleThought);

// // /api/Thoughts/:ThoughtId/reactions
// router.route("/:ThoughtId/friends/:friendId").post(addReaction);

// /api/Thoughts/:ThoughtId/reactions/:reactionId
// router.route("/:ThoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
