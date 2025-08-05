const { DataTypes } = require("sequelize");
const db = require("./db");

const PostShare = db.define(
  "post_shares",
  {
    share_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    original_post_id: { type: DataTypes.INTEGER, allowNull: false },
    shared_by_user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "post_shares",
    timestamps: false,
    indexes: [
      { unique: true, fields: ["shared_by_user_id", "original_post_id"] },
    ],
  }
);

module.exports = PostShare;
