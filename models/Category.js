const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    icon: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", schema);
