const { DataTypes } = require("sequelize");
const db = require("./db");

const Conversation = db.define(
  "conversations",
  {
    conversation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "conversations", timestamps: false }
);

module.exports = Conversation;
