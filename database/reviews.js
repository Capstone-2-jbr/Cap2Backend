const { DataTypes } = require("sequelize");
const db = require("./db");

const Review = db.define(
  "reviews",
  {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    listing_id: { type: DataTypes.INTEGER, allowNull: false },
    reviewer_id: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT },
  },
  {
    tableName: "reviews",
    indexes: [
      { fields: ["listing_id"] },
      { unique: true, fields: ["reviewer_id", "listing_id"] },
    ],
  }
);

module.exports = Review;