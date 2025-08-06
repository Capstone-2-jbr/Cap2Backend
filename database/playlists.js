const { DataTypes } = require("sequelize");
const db = require("./db");

const Playlist = db.define(
  "playlists",
  {
    playlist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    creator_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING(120), allowNull: false },
    description: { type: DataTypes.TEXT },
    is_public: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: "playlists",
    timestamps: true,
  },
);

module.exports = Playlist;
