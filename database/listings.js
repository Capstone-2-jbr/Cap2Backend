const { DataTypes } = require("sequelize");
const db = require("./db");

const Listing = db.define(
  "listings",
  {
    listing_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    seller_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING(200), allowNull: false },
    description: { type: DataTypes.TEXT },
    product_kind: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "physical",
    },
    price_cents: { type: DataTypes.INTEGER, allowNull: false },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: "USD",
    },
    quantity_available: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "listings",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [{ fields: ["seller_id"] }, { fields: ["title"] }],
  }
);

module.exports = Listing;
