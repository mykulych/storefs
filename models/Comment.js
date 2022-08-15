const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    content: String,
    parentId: { type: Schema.Types.ObjectId, ref: "Ad" },
    publisher: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Comment", schema);
