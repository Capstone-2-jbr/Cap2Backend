const { DataTypes } = require("sequelize");
const db = require("./db");

const UserSetting = db.define("user_settings", {
  settings_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  theme: { type: DataTypes.STRING(20), defaultValue: "bright" },
  autoplay_music: { type: DataTypes.BOOLEAN, defaultValue: true },
  notifications: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = UserSetting;
