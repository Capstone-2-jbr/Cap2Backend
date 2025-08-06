const { DataTypes } = require("sequelize");
const db = require("./db");

const Message = db.define(
  "messages",
  {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    conversation_id: { type: DataTypes.INTEGER, allowNull: false },
    sender_id: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "messages",
    timestamps: false,
    indexes: [{ fields: ["conversation_id", "created_at"] }],
  }
);

module.exports = Message;
