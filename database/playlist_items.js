const { DataTypes } = require("sequelize");
const db = require("./db");

const PlaylistItem = db.define(
  "playlist_items",
  {
    playlist_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playlist_id: { type: DataTypes.INTEGER, allowNull: false },
    added_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
    youtube_url: { type: DataTypes.STRING(500), allowNull: false },
    title_cache: { type: DataTypes.STRING(255) },
    duration_seconds: { type: DataTypes.INTEGER },
    position: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "playlist_items",
    timestamps: false,
    indexes: [{ unique: true, fields: ["playlist_id", "position"] }],
  }
);

module.exports = PlaylistItem;
