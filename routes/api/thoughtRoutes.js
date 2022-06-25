const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  addReaction,
  modifyThought,
  deleteThought,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/Thoughts
router.route("/").get(getAllThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(modifyThought)
  .delete(deleteThought);

// /api/Thoughts/:ThoughtId/reactions
router.route("/:thoughtId/reactions/").post(addReaction);

// /api/Thoughts/:ThoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
