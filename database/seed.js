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

    const users = await User.bulkCreate([
      {
        email: "admin@example.com",
        username: "admin",
        passwordHash: bcrypt.hashSync("admin123", 10),
        auth0Id: null,
      },
      {
        email: "user1@example.com",
        username: "user1",
        passwordHash: bcrypt.hashSync("user111", 10),
        auth0Id: null,
      },
      {
        email: "user2@example.com",
        username: "user2",
        passwordHash: bcrypt.hashSync("user222", 10),
        auth0Id: null,
      },
    ]);

    const [u1, u2, u3] = users;

    const settings = await UserSetting.bulkCreate([
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
    ]);

    const posts = await Post.bulkCreate([
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
    ]);

    const [p1, p2, p3] = posts;

    const postMedia = await PostMedia.bulkCreate(
      [
        {
          post_id: p1.post_id,
          url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
          position: 1,
        },
        {
          post_id: p2.post_id,
          url: "https://media.istockphoto.com/id/496202746/photo/real-woman-dj-playing-music-at-party.jpg?s=612x612&w=0&k=20&c=4VCu3JapJRYDJnt8fQdlPIMg1j4V0GfLASIR2PIsB_A=",
          position: 1,
        },
        {
          post_id: p3.post_id,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzN1DyOOOejOH5isjfUXp3Ad9XQ186ezuh01wqaJyjJXLD_RF1LsnqgJ8OfaNXOaIc_Sk&usqp=CAU",
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
          seller_id: 1,
          title: "The Marshall Mathers LP",
          artist: "Eminem",
          price_cents: 6500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Madvillainy",
          artist: "MF Doom",
          price_cents: 3500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Black Sabbath: The Dio Years",
          artist: "Black Sabbath",
          price_cents: 4500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Confessions",
          artist: "Usher",
          price_cents: 4500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "The Chronic",
          artist: "Dr. Dre",
          price_cents: 4500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Elephant",
          artist: "The White Stripes",
          price_cents: 4500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Survivor",
          artist: "Destiny's Child",
          price_cents: 4500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Year of the Gentleman",
          artist: "Ne-Yo",
          price_cents: 4500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Until the End of Time",
          artist: "2Pac",
          price_cents: 4500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Speakerboxxx/The Love Below",
          artist: "OutKast",
          price_cents: 4800,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "R&G (Rhythm & Gangsta): The Masterpiece",
          artist: "Snoop Dogg",
          price_cents: 4500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Music of the Sun",
          artist: "Rihanna",
          price_cents: 4500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Random Access Memories",
          artist: "Daft Punk",
          price_cents: 4000,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Demon Days",
          artist: "Gorillaz",
          price_cents: 3500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "To Pimp a Butterfly",
          artist: "Kendrick Lamar",
          price_cents: 2500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "The Fame",
          artist: "Lady Gaga",
          price_cents: 4500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "I Am... Sasha Fierce",
          artist: "Beyoncé",
          price_cents: 3200,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "I Am The West",
          artist: "Ice Cube",
          price_cents: 4500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Scorpion",
          artist: "Drake",
          price_cents: 4500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Lemonade",
          artist: "Beyoncé",
          price_cents: 4900,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Channel Orange",
          artist: "Frank Ocean",
          price_cents: 4700,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "?",
          artist: "XXXTentacion",
          price_cents: 4500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Beauty Behind the Madness",
          artist: "The Weeknd",
          price_cents: 4500,
          currency: "USD",
          quantity_available: 10,
        },
        {
          seller_id: 1,
          title: "Astroworld",
          artist: "Travis Scott",
          price_cents: 4100,
          currency: "USD",
          quantity_available: 10,
        },
      ],
      { returning: true }
    );

    const [
      l1,
      l2,
      l3,
      l4,
      l5,
      l6,
      l7,
      l8,
      l9,
      l10,
      l11,
      l12,
      l13,
      l14,
      l15,
      l16,
      l17,
      l18,
      l19,
      l20,
      l21,
      l22,
      l23,
      l24,
    ] = listings;

    const listingMedia = await ListingMedia.bulkCreate(
      [
        {
          listing_id: l1.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/a/ae/The_Marshall_Mathers_LP.jpg",
          type: "image",
          position: 1,
        },
        {
          listing_id: l2.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/5/5e/Madvillainy_cover.png",
          type: "image",
          position: 1,
        },
        {
          listing_id: l3.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/1/1b/SabbathDio.jpg",
          type: "image",
          position: 1,
        },
        {
          listing_id: l4.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/f/f7/Usher_-_Confessions_album_cover.png",
          type: "image",
          position: 1,
        },
        {
          listing_id: l5.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/1/19/Dr.DreTheChronic.jpg",
          type: "image",
          position: 1,
        },
        {
          listing_id: l6.listing_id,
          url: "https://media.gq-magazine.co.uk/photos/65c62b0db4be5de0d4eb99fa/master/w_960,c_limit/00s_albums_01.jpg",
          type: "image",
          position: 1,
        },
        {
          listing_id: l7.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/9/99/Destiny%27s_Child_%E2%80%93_Survivor.jpg",
          type: "image",
          position: 1,
        },
        {
          listing_id: l8.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/3/3e/Ne-Yo_-_Closer.jpg",
          type: "image",
          position: 1,
        },
        {
          listing_id: l9.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/9/94/Untiltheend.jpg",
          type: "image",
          position: 1,
        },
        {
          listing_id: l10.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/5/54/Speakerboxxx-The_Love_Below.png",
          type: "image",
          position: 1,
        },
        {
          listing_id: l11.listing_id,
          url: "https://i.scdn.co/image/ab67616d0000b273e803716268c173c3f9a0c057",
          type: "image",
          position: 1,
        },
        {
          listing_id: l12.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/6/6e/Rihanna_-_Music_of_the_Sun.png",
          type: "image",
          position: 1,
        },
        {
          listing_id: l13.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/2/26/Daft_Punk_-_Random_Access_Memories.png",
          type: "image",
          position: 1,
        },
        {
          listing_id: l14.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/d/df/Gorillaz_Demon_Days.PNG",
          type: "image",
          position: 1,
        },
        {
          listing_id: l15.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png",
          type: "image",
          position: 1,
        },
        {
          listing_id: l16.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/d/dd/Lady_Gaga_%E2%80%93_The_Fame_album_cover.png",
          type: "image",
          position: 1,
        },
        {
          listing_id: l17.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/4/44/Single_Ladies_%28Put_a_Ring_on_It%29_cover.png",
          type: "image",
          position: 1,
        },
        {
          listing_id: l18.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/6/69/Ice_Cube_-_I_Am_The_West_%28Front_Cover%29.jpg",
          type: "image",
          position: 1,
        },
        {
          listing_id: l19.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/9/90/Scorpion_by_Drake.jpg",
          type: "image",
          position: 1,
        },
        {
          listing_id: l20.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/5/53/Beyonce_-_Lemonade_%28Official_Album_Cover%29.png",
          type: "image",
          position: 1,
        },
        {
          listing_id: l21.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/2/28/Channel_ORANGE.jpg",
          type: "image",
          position: 1,
        },
        {
          listing_id: l22.listing_id,
          url: "https://i.scdn.co/image/ab67616d0000b273806c160566580d6335d1f16c",
          type: "image",
          position: 1,
        },
        {
          listing_id: l23.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/b/bd/The_Weeknd_-_Beauty_Behind_the_Madness.png",
          type: "image",
          position: 1,
        },
        {
          listing_id: l24.listing_id,
          url: "https://upload.wikimedia.org/wikipedia/en/4/4b/Travis_Scott_-_Astroworld.png",
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
