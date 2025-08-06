const { DataTypes } = require("sequelize");
const db = require("./db");

const ListingMedia = db.define(
  "listing_media",
  {
    listing_media_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    listing_id: { type: DataTypes.INTEGER, allowNull: false },
    url: { type: DataTypes.STRING(500), allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    position: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  { tableName: "listing_media", timestamps: false }
);

module.exports = ListingMedia;
