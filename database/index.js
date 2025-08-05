const db = require("./db");
const User = require("./user");
const UserSetting = require("./user_settings.js")
const Post = require("./posts")
const PostMedia = require("./post_media.js")
const Comment = require("./comments.js")
const PostLike = require("./post_likes.js")
const CommentLike = require("./comment_likes.js")
const Follow = require("./follows.js")
const PostShare = require("./post_shares.js")

module.exports = {
  db,
  User,
  UserSetting,
  Post,
  PostMedia,
  Comment,
  PostLike,
  CommentLike,
  Follow,
  PostShare,

};
