const { DataTypes } = require("sequelize");
const db = require("./db");

const PostMedia = db.define(
  "post_media",
  {
    media_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: { type: DataTypes.INTEGER, allowNull: false },
    url: { type: DataTypes.STRING(500), allowNull: false },
    position: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  { tableName: "post_media", timestamps: false }
);

module.exports = PostMedia;
