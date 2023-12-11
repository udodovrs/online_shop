const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
    },
    prise: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    avalible: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
