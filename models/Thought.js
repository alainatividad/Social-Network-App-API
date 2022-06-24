const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const optionsDate = { year: "numeric", month: "short", day: "numeric" };
const optionsTime = { hour12: true, hour: "2-digit", minute: "2-digit" };

// Schema to create Thought model
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (v) {
      const date = v.toLocaleDateString("en-GB", optionsDate);
      const time = v.toLocaleTimeString("en-GB", optionsTime);
      return `${date} at ${time}`;
    },
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

// Initialize our Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
