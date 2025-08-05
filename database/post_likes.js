const { DataTypes } = require("sequelize");
const db = require("./db");

const PostLike = db.define(
  "post_likes",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    post_id: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    tableName: "post_likes",
    timestamps: false,
    indexes: [{ fields: ["post_id"] }],
  }
);

module.exports = PostLike;
