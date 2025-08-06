const { DataTypes } = require("sequelize");
const db = require("./db");

const ConversationMember = db.define(
  "conversation_members",
  {
    conversation_id: { type: DataTypes.INTEGER, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    joined_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "conversation_members",
    timestamps: false,
    indexes: [{ fields: ["user_id"] }],
  }
);

module.exports = ConversationMember;
