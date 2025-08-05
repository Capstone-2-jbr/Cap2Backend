const { DataTypes } = require("sequelize");
const db = require("./db");

const Post = db.define("posts", {
  post_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  content: { type: DataTypes.TEXT },
  visibility: {
    type: DataTypes.ENUM("public", "followers", "private"),
    defaultValue: "public",
  },
});

module.exports = Post;
