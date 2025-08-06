const { DataTypes } = require("sequelize");
const db = require("./db");

const Order = db.define(
  "orders",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    buyer_id: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    total_cents: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: "USD",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
    indexes: [
      { fields: ["buyer_id"] },
      { fields: ["status"] },
    ],
  }
);

module.exports = Order;
