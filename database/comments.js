const { DataTypes } = require("sequelize");
const db = require("./db");

const Comment = db.define("comments", {
  comment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  post_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  parent_comment_id: { type: DataTypes.INTEGER, allowNull: true },
  content: { type: DataTypes.TEXT, allowNull: false },
});

module.exports = Comment;
