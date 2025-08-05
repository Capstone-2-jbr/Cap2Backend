const { DataTypes } = require("sequelize");
const db = require("./db");

const CommentLike = db.define(
  "comment_likes",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    comment_id: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    tableName: "comment_likes",
    timestamps: false,
    indexes: [{ fields: ["comment_id"] }],
  }
);

module.exports = CommentLike;
