const { DataTypes } = require("sequelize");
const db = require("./db");

const OrderItem = db.define(
  "order_items",
  {
    order_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    listing_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    unit_price_cents: { type: DataTypes.INTEGER, allowNull: false },
    title_snapshot: { type: DataTypes.STRING(200) },
  },
  {
    tableName: "order_items",
    timestamps: false,
    indexes: [{ fields: ["order_id"] }],
  }
);

module.exports = OrderItem;
