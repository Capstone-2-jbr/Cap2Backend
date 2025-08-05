const { DataTypes } = require("sequelize");
const db = require("./db");

const PlaylistSave = db.define(
  "playlist_saves",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    playlist_id: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    tableName: "playlist_saves",
    timestamps: false,
    indexes: [{ fields: ["playlist_id"] }],
  }
);

module.exports = PlaylistSave;
