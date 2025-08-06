const { DataTypes } = require("sequelize");
const db = require("./db");

const CartItem = db.define(
  "cart_items",
  {
    cart_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: { type: DataTypes.INTEGER, allowNull: false },
    listing_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  },
  {
    tableName: "cart_items",
    timestamps: false,
    indexes: [{ unique: true, fields: ["cart_id", "listing_id"] }],
  }
);

module.exports = CartItem;
