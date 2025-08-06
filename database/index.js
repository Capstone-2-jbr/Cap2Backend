const db = require("./db");
const User = require("./user");
const UserSetting = require("./user_settings.js");
const Post = require("./posts");
const PostMedia = require("./post_media.js");
const Comment = require("./comments.js");
const PostLike = require("./post_likes.js");
const CommentLike = require("./comment_likes.js");
const Follow = require("./follows.js");
const PostShare = require("./post_shares.js");
const Playlist = require("./playlists.js");
const PlaylistItem = require("./playlist_items.js");
const PlaylistSave = require("./playlist_saves.js");
const Listing = require("./listings.js");
const ListingMedia = require("./listing_media.js");
const Cart = require("./carts.js");
const CartItem = require("./cart_items.js");
const Order = require("./orders.js");
const OrderItem = require("./order_items.js");
const Review = require("./reviews.js");
const Conversation = require("./conversations.js");
const ConversationMember = require("./conversation_members.js");
const Message = require("./messages");

User.hasOne(UserSetting, { foreignKey: "user_id", as: "settings" });
UserSetting.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

Post.hasMany(PostMedia, { foreignKey: "post_id", as: "media" });
PostMedia.belongsTo(Post, { foreignKey: "post_id" });

Post.hasMany(Comment, { foreignKey: "post_id", as: "comments" });
Comment.belongsTo(Post, { foreignKey: "post_id" });
Comment.belongsTo(User, { foreignKey: "user_id", as: "author" });
Comment.hasMany(Comment, { foreignKey: "parent_comment_id", as: "replies" });
Comment.belongsTo(Comment, { foreignKey: "parent_comment_id", as: "parent" });

User.belongsToMany(Post, {
  through: PostLike,
  foreignKey: "user_id",
  otherKey: "post_id",
  as: "liked_posts",
});
Post.belongsToMany(User, {
  through: PostLike,
  foreignKey: "post_id",
  otherKey: "user_id",
  as: "likers",
});

User.belongsToMany(Comment, {
  through: CommentLike,
  foreignKey: "user_id",
  otherKey: "comment_id",
  as: "liked_comments",
});
Comment.belongsToMany(User, {
  through: CommentLike,
  foreignKey: "comment_id",
  otherKey: "user_id",
  as: "comment_likers",
});

User.belongsToMany(User, {
  through: Follow,
  as: "following",
  foreignKey: "follower_id",
  otherKey: "followee_id",
});
User.belongsToMany(User, {
  through: Follow,
  as: "followers",
  foreignKey: "followee_id",
  otherKey: "follower_id",
});

Post.hasMany(PostShare, { foreignKey: "original_post_id", as: "shares" });
PostShare.belongsTo(Post, {
  foreignKey: "original_post_id",
  as: "originalPost",
});
User.hasMany(PostShare, { foreignKey: "shared_by_user_id", as: "shares_made" });
PostShare.belongsTo(User, { foreignKey: "shared_by_user_id", as: "sharer" });

User.hasMany(Playlist, { foreignKey: "user_id", as: "playlists" });
Playlist.belongsTo(User, { foreignKey: "user_id", as: "owner" });

Playlist.hasMany(PlaylistItem, { foreignKey: "playlist_id", as: "items" });
PlaylistItem.belongsTo(Playlist, { foreignKey: "playlist_id" });
PlaylistItem.belongsTo(User, {
  foreignKey: "added_by_user_id",
  as: "added_by",
});

User.belongsToMany(Playlist, {
  through: PlaylistSave,
  foreignKey: "user_id",
  otherKey: "playlist_id",
  as: "saved_playlists",
});
Playlist.belongsToMany(User, {
  through: PlaylistSave,
  foreignKey: "playlist_id",
  otherKey: "user_id",
  as: "savers",
});

User.hasMany(Listing, { foreignKey: "seller_id", as: "listings" });
Listing.belongsTo(User, { foreignKey: "seller_id", as: "seller" });

Listing.hasMany(ListingMedia, { foreignKey: "listing_id", as: "media" });
ListingMedia.belongsTo(Listing, { foreignKey: "listing_id" });

User.hasOne(Cart, { foreignKey: "user_id", as: "cart" });
Cart.belongsTo(User, { foreignKey: "user_id" });

Cart.hasMany(CartItem, { foreignKey: "cart_id", as: "items" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });
CartItem.belongsTo(Listing, { foreignKey: "listing_id" });
Listing.hasMany(CartItem, { foreignKey: "listing_id" });

User.hasMany(Order, { foreignKey: "buyer_id", as: "orders" });
Order.belongsTo(User, { foreignKey: "buyer_id", as: "buyer" });

Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });
OrderItem.belongsTo(Listing, { foreignKey: "listing_id" });
Listing.hasMany(OrderItem, { foreignKey: "listing_id" });

Listing.hasMany(Review, { foreignKey: "listing_id", as: "reviews" });
Review.belongsTo(Listing, { foreignKey: "listing_id" });
User.hasMany(Review, { foreignKey: "reviewer_id", as: "reviews_made" });
Review.belongsTo(User, { foreignKey: "reviewer_id", as: "reviewer" });

Conversation.belongsToMany(User, {
  through: ConversationMember,
  foreignKey: "conversation_id",
  otherKey: "user_id",
  as: "members",
});
User.belongsToMany(Conversation, {
  through: ConversationMember,
  foreignKey: "user_id",
  otherKey: "conversation_id",
  as: "conversations",
});

Conversation.hasMany(Message, {
  foreignKey: "conversation_id",
  as: "messages",
});
Message.belongsTo(Conversation, { foreignKey: "conversation_id" });
Message.belongsTo(User, { foreignKey: "sender_id", as: "sender" });

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
  Playlist,
  PlaylistItem,
  PlaylistSave,
  Listing,
  ListingMedia,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Review,
  Conversation,
  ConversationMember,
  Message,
};
