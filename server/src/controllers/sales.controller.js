const salesService = require("../services/sales.service");

const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await salesService.getCartByUser(userId);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

const addItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const card = req.body;
    const cart = await salesService.addItem(userId, card);
    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    const { quantity } = req.body;
    const updated = await salesService.updateItem(userId, itemId, quantity);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    const removed = await salesService.removeItem(userId, itemId);
    res.status(200).json(removed);
  } catch (err) {
    next(err);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await salesService.clearCart(userId);
    res.status(200).json({ message: "Carrito limpiado correctamente." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart,
};
