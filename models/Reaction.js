const { Schema, Types } = require("mongoose");
const optionsDate = { year: "numeric", month: "short", day: "numeric" };
const optionsTime = { hour12: true, hour: "2-digit", minute: "2-digit" };

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
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
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// not a model so the schema is the one imported
module.exports = reactionSchema;
