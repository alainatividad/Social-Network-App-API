const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const optionsDate = { year: "numeric", month: "short", day: "numeric" };
const optionsTime = { hour12: true, hour: "2-digit", minute: "2-digit" };

function formatDate(createdDate) {
  const date = createdDate.toLocaleDateString("en-GB", optionsDate);
  const time = createdDate.toLocaleTimeString("en-GB", optionsTime);
  return `${date} at ${time}`;
}

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    // Include virtuals to be the JSON response
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the length of the user's reactions array field on query
thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });
// Initialize our Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
