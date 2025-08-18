const express = require("express");
const router = express.Router();
const { authenticateJWT, requireAuth, requireAdmin } = require("../auth");

const { Cart, CartItem, Listing, ListingMedia } = require("../database");

router.get("/", requireAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { user_id: req.user.id },
      include: [
        {
          model: CartItem,
          as: "items", 
          include: [
            {
              model: Listing,
              include: [{ model: ListingMedia, as: "media" }]
            }
          ]
        }
      ]
    });
    res.json(cart || { items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get cart" });
  }
});
router.post("/add", requireAuth, async (req, res) => {
  const { listing_id, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ where: { user_id: req.user.id } });
    if (!cart) {
      cart = await Cart.create({ user_id: req.user.id });
    }

    let item = await CartItem.findOne({
      where: { cart_id: cart.cart_id, listing_id }
    });

    if (item) {
      item.quantity += quantity || 1;
      await item.save();
    } else {
      item = await CartItem.create({
        cart_id: cart.cart_id,
        listing_id,
        quantity: quantity || 1
      });
    }

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});
router.put("/item/:id", requireAuth, async (req, res) => {
  try {
    const item = await CartItem.findByPk(req.params.id, {
      include: [{ model: Cart }]
    });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (!item.cart) {
      return res.status(500).json({ error: "Cart not linked to this item" });
    }

    if (item.cart.user_id !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    item.quantity = req.body.quantity;
    await item.save();

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update quantity" });
  }
});

router.delete("/item/:id", requireAuth, async (req, res) => {
  try {
    const item = await CartItem.findByPk(req.params.id, {
      include: [{ model: Cart }]
    });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (!item.cart) {
      return res.status(500).json({ error: "Cart not linked to this item" });
    }

    if (item.cart.user_id !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this item" });
    }

    await item.destroy();
    res.json({ message: "Item removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove cart item" });
  }
});

module.exports=router;



