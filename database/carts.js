const { DataTypes } = require("sequelize");
const db = require("./db");

const Cart = db.define("carts", {
  cart_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
});

module.exports = Cart;
