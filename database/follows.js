const { DataTypes } = require("sequelize");
const db = require("./db");

const Follow = db.define(
  "follows",
  {
    follower_id: { type: DataTypes.INTEGER, primaryKey: true },
    followee_id: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    tableName: "follows",
    timestamps: false,
    indexes: [{ fields: ["followee_id"] }],
    validate: {
      notSelfFollow() {
        if (this.follower_id === this.following_id) {
          throw new Error("Users cannot follow themselves");
        }
      },
    },
  }
);

module.exports = Follow;
