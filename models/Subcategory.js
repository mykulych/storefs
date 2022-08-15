const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    image: { type: String },
    name: { type: String, required: true },
    parent_id: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Subcategory", schema);
