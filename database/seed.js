const bcrypt = require("bcrypt");
const db = require("./db");
const {
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
} = require("./index");

const seed = async () => {
  try {
    await db.sync({ force: true });

    const users = await User.bulkCreate(
      [
        {
          email: "admin@example.com",
          username: "admin",
          password_hash: bcrypt.hashSync("admin123", 10),
          oauth_provider: null,
          oauth_sub: null,
        },
        {
          email: "user1@example.com",
          username: "user1",
          password_hash: bcrypt.hashSync("user111", 10),
          oauth_provider: null,
          oauth_sub: null,
        },
        {
          email: "user2@example.com",
          username: "user2",
          password_hash: bcrypt.hashSync("user222", 10),
          oauth_provider: null,
          oauth_sub: null,
        },
      ],
      { returning: true }
    );

    const [u1, u2, u3] = users;

    const settings = await UserSetting.bulkCreate(
      [
        {
          user_id: u1.user_id,
          theme: "bright",
          autoplay_music: true,
          notifications: true,
        },
        {
          user_id: u2.user_id,
          theme: "dark",
          autoplay_music: false,
          notifications: true,
        },
        {
          user_id: u3.user_id,
          theme: "bright",
          autoplay_music: true,
          notifications: false,
        },
      ],
      { returning: true }
    );

    const posts = await Post.bulkCreate(
      [
        { user_id: u1.user_id, content: "Hello world", visibility: "public" },
        {
          user_id: u2.user_id,
          content: "Second post",
          visibility: "followers",
        },
        {
          user_id: u3.user_id,
          content: "Private thoughts",
          visibility: "private",
        },
      ],
      { returning: true }
    );

    const [p1, p2, p3] = posts;

    const postMedia = await PostMedia.bulkCreate(
      [
        {
          post_id: p1.post_id,
          url: "https://example.com/p1-1.jpg",
          type: "image",
          position: 1,
        },
        {
          post_id: p2.post_id,
          url: "https://example.com/p2-1.jpg",
          type: "image",
          position: 1,
        },
        {
          post_id: p3.post_id,
          url: "https://example.com/p3-1.mp4",
          type: "video",
          position: 1,
        },
      ],
      { returning: true }
    );

    const comments = await Comment.bulkCreate(
      [
        { post_id: p1.post_id, user_id: u2.user_id, content: "Nice!" },
        { post_id: p2.post_id, user_id: u3.user_id, content: "Cool" },
        {
          post_id: p1.post_id,
          user_id: u1.user_id,
          parent_comment_id: 1,
          content: "Thanks",
        },
      ],
      { returning: true }
    );

    const [c1, c2, c3] = comments;

    const postLikes = await PostLike.bulkCreate(
      [
        { user_id: u2.user_id, post_id: p1.post_id },
        { user_id: u3.user_id, post_id: p2.post_id },
        { user_id: u1.user_id, post_id: p3.post_id },
      ],
      { returning: true }
    );

    const commentLikes = await CommentLike.bulkCreate(
      [
        { user_id: u1.user_id, comment_id: c1.comment_id },
        { user_id: u2.user_id, comment_id: c2.comment_id },
        { user_id: u3.user_id, comment_id: c1.comment_id },
      ],
      { returning: true }
    );

    const follows = await Follow.bulkCreate(
      [
        { follower_id: u1.user_id, followee_id: u2.user_id },
        { follower_id: u2.user_id, followee_id: u3.user_id },
        { follower_id: u3.user_id, followee_id: u1.user_id },
      ],
      { returning: true }
    );

    const shares = await PostShare.bulkCreate(
      [
        {
          original_post_id: p1.post_id,
          shared_by_user_id: u3.user_id,
          caption: "Check this",
        },
        {
          original_post_id: p2.post_id,
          shared_by_user_id: u1.user_id,
          caption: "Sharing",
        },
        {
          original_post_id: p3.post_id,
          shared_by_user_id: u2.user_id,
          caption: "FYI",
        },
      ],
      { returning: true }
    );

    const playlists = await Playlist.bulkCreate(
      [
        { user_id: u1.user_id, name: "Favorites", is_public: true },
        { user_id: u2.user_id, name: "Chill", is_public: false },
        { user_id: u3.user_id, name: "Workout", is_public: true },
      ],
      { returning: true }
    );

    const [pl1, pl2, pl3] = playlists;

    const playlistItems = await PlaylistItem.bulkCreate(
      [
        {
          playlist_id: pl1.playlist_id,
          added_by_user_id: u1.user_id,
          youtube_url: "https://youtu.be/aaa",
          title_cache: "Track A",
          duration_seconds: 210,
          position: 1,
        },
        {
          playlist_id: pl2.playlist_id,
          added_by_user_id: u2.user_id,
          youtube_url: "https://youtu.be/bbb",
          title_cache: "Track B",
          duration_seconds: 180,
          position: 1,
        },
        {
          playlist_id: pl3.playlist_id,
          added_by_user_id: u3.user_id,
          youtube_url: "https://youtu.be/ccc",
          title_cache: "Track C",
          duration_seconds: 240,
          position: 1,
        },
      ],
      { returning: true }
    );

    const playlistSaves = await PlaylistSave.bulkCreate(
      [
        { user_id: u2.user_id, playlist_id: pl1.playlist_id },
        { user_id: u3.user_id, playlist_id: pl1.playlist_id },
        { user_id: u1.user_id, playlist_id: pl3.playlist_id },
      ],
      { returning: true }
    );

    const listings = await Listing.bulkCreate(
      [
        {
          seller_id: u1.user_id,
          title: "Guitar",
          description: "Acoustic",
          product_kind: "physical",
          price_cents: 15000,
          currency: "USD",
          quantity_available: 2,
        },
        {
          seller_id: u2.user_id,
          title: "E-Book",
          description: "PDF",
          product_kind: "digital",
          price_cents: 999,
          currency: "USD",
          quantity_available: 100,
        },
        {
          seller_id: u3.user_id,
          title: "Headphones",
          description: "Over-ear",
          product_kind: "physical",
          price_cents: 7000,
          currency: "USD",
          quantity_available: 5,
        },
      ],
      { returning: true }
    );

    const [l1, l2, l3] = listings;

    const listingMedia = await ListingMedia.bulkCreate(
      [
        {
          listing_id: l1.listing_id,
          url: "https://example.com/guitar.jpg",
          type: "image",
          position: 1,
        },
        {
          listing_id: l2.listing_id,
          url: "https://example.com/ebook.jpg",
          type: "image",
          position: 1,
        },
        {
          listing_id: l3.listing_id,
          url: "https://example.com/headphones.jpg",
          type: "image",
          position: 1,
        },
      ],
      { returning: true }
    );

    const carts = await Cart.bulkCreate(
      [
        { user_id: u1.user_id },
        { user_id: u2.user_id },
        { user_id: u3.user_id },
      ],
      { returning: true }
    );

    const [cart1, cart2, cart3] = carts;

    const cartItems = await CartItem.bulkCreate(
      [
        { cart_id: cart1.cart_id, listing_id: l2.listing_id, quantity: 1 },
        { cart_id: cart2.cart_id, listing_id: l3.listing_id, quantity: 2 },
        { cart_id: cart3.cart_id, listing_id: l1.listing_id, quantity: 1 },
      ],
      { returning: true }
    );

    const orders = await Order.bulkCreate(
      [
        {
          buyer_id: u1.user_id,
          status: "pending",
          total_cents: 999,
          currency: "USD",
        },
        {
          buyer_id: u2.user_id,
          status: "paid",
          total_cents: 15000,
          currency: "USD",
        },
        {
          buyer_id: u3.user_id,
          status: "shipped",
          total_cents: 7000,
          currency: "USD",
        },
      ],
      { returning: true }
    );

    const [o1, o2, o3] = orders;

    const orderItems = await OrderItem.bulkCreate(
      [
        {
          order_id: o1.order_id,
          listing_id: l2.listing_id,
          quantity: 1,
          unit_price_cents: 999,
          title_snapshot: "E-Book",
        },
        {
          order_id: o2.order_id,
          listing_id: l1.listing_id,
          quantity: 1,
          unit_price_cents: 15000,
          title_snapshot: "Guitar",
        },
        {
          order_id: o3.order_id,
          listing_id: l3.listing_id,
          quantity: 1,
          unit_price_cents: 7000,
          title_snapshot: "Headphones",
        },
      ],
      { returning: true }
    );

    const reviews = await Review.bulkCreate(
      [
        {
          listing_id: l1.listing_id,
          reviewer_id: u2.user_id,
          rating: 5,
          content: "Great",
        },
        {
          listing_id: l2.listing_id,
          reviewer_id: u3.user_id,
          rating: 4,
          content: "Good",
        },
        {
          listing_id: l3.listing_id,
          reviewer_id: u1.user_id,
          rating: 3,
          content: "Okay",
        },
      ],
      { returning: true }
    );

    const conversations = await Conversation.bulkCreate([{}, {}, {}], {
      returning: true,
    });

    const [conv1, conv2, conv3] = conversations;

    const members = await ConversationMember.bulkCreate(
      [
        { conversation_id: conv1.conversation_id, user_id: u1.user_id },
        { conversation_id: conv1.conversation_id, user_id: u2.user_id },
        { conversation_id: conv2.conversation_id, user_id: u3.user_id },
      ],
      { returning: true }
    );

    const messages = await Message.bulkCreate(
      [
        {
          conversation_id: conv1.conversation_id,
          sender_id: u1.user_id,
          content: "Hi",
        },
        {
          conversation_id: conv1.conversation_id,
          sender_id: u2.user_id,
          content: "Hello",
        },
        {
          conversation_id: conv2.conversation_id,
          sender_id: u3.user_id,
          content: "Anyone here?",
        },
      ],
      { returning: true }
    );

    console.log("Seeded users:", users.length);
    console.log("Seeded user_settings:", settings.length);
    console.log("Seeded posts:", posts.length);
    console.log("Seeded post_media:", postMedia.length);
    console.log("Seeded comments:", comments.length);
    console.log("Seeded post_likes:", postLikes.length);
    console.log("Seeded comment_likes:", commentLikes.length);
    console.log("Seeded follows:", follows.length);
    console.log("Seeded post_shares:", shares.length);
    console.log("Seeded playlists:", playlists.length);
    console.log("Seeded playlist_items:", playlistItems.length);
    console.log("Seeded playlist_saves:", playlistSaves.length);
    console.log("Seeded listings:", listings.length);
    console.log("Seeded listing_media:", listingMedia.length);
    console.log("Seeded carts:", carts.length);
    console.log("Seeded cart_items:", cartItems.length);
    console.log("Seeded orders:", orders.length);
    console.log("Seeded order_items:", orderItems.length);
    console.log("Seeded reviews:", reviews.length);
    console.log("Seeded conversations:", conversations.length);
    console.log("Seeded conversation_members:", members.length);
    console.log("Seeded messages:", messages.length);
    console.log("Done");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await db.close();
  }
};

seed();
