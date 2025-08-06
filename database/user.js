const { DataTypes } = require("sequelize");
const db = require("./db");
const bcrypt = require("bcrypt");

const User = db.define("user", {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 20],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  auth0Id: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profile_picture: {
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue:
      "https://png.pngtree.com/png-vector/20241012/ourmid/pngtree-cat-peeking-from-frame-png-image_14067902.png",
  },
  dob: { type: DataTypes.DATEONLY },
  bio: {
    type: DataTypes.STRING(1000),
    allowNull: true,
    defaultvalue: "Veni, vidi, vici",
  },
});

// Instance method to check password
User.prototype.checkPassword = function (password) {
  if (!this.passwordHash) {
    return false; // Auth0 users don't have passwords
  }
  return bcrypt.compareSync(password, this.passwordHash);
};

// Class method to hash password
User.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};

module.exports = User;
