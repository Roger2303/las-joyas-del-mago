const db = require("../db/database");
const logger = require("../utils/logger");
const AppHerror = require("../helpers/App.Herror");

// Obtener el carrito completo de un usuario
const getCartByUser = async (userId) => {
  try {
    const result = await db.query(
      "SELECT * FROM cart_items WHERE user_id = $1 ORDER BY added_at ASC",
      [userId]
    );
    return result.rows;
  } catch (err) {
    logger.error(
      `Error consultando carrito de usuario ${userId}: ${err.message}`
    );
    throw new AppHerror("No se pudo obtener el carrito.", 500);
  }
};

// Agregar producto al carrito
const addItem = async (userId, card) => {
  try {
    // Si el item ya existe, actualiza cantidad
    const exist = await db.query(
      "SELECT id, quantity FROM cart_items WHERE user_id = $1 AND card_id = $2",
      [userId, card.card_id]
    );
    if (exist.rows.length > 0) {
      // si ya existe, solo suma la cantidad
      const newQuantity = exist.rows[0].quantity + (card.quantity || 1);
      await db.query("UPDATE cart_items SET quantity = $1 WHERE id = $2", [
        newQuantity,
        exist.rows[0].id,
      ]);
      return getCartByUser(userId);
    }
    // si no existe, inserta el ítem nuevo
    await db.query(
      `INSERT INTO cart_items
        (user_id, card_id, card_name, card_image, card_type, card_set, price, quantity)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        userId,
        card.card_id,
        card.card_name,
        card.card_image,
        card.card_type,
        card.card_set,
        card.price,
        card.quantity || 1,
      ]
    );
    return getCartByUser(userId);
  } catch (err) {
    logger.error(
      `Error agregando producto al carrito usuario ${userId}: ${err.message}`
    );
    throw new AppHerror("No se pudo agregar el producto al carrito.", 500);
  }
};

// mdificar cantidad de un producto o editar campos
const updateItem = async (userId, itemId, quantity) => {
  try {
    const result = await db.query(
      "UPDATE cart_items SET quantity = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
      [quantity, itemId, userId]
    );
    if (!result.rows.length) {
      throw new AppHerror("El item no existe en el carrito.", 404);
    }
    return result.rows[0];
  } catch (err) {
    logger.error(
      `Error actualizando item ${itemId} de usuario ${userId}: ${err.message}`
    );
    if (err instanceof AppHerror) throw err;
    throw new AppHerror(
      "No se pudo actualizar el producto en el carrito.",
      500
    );
  }
};

// Eliminar un producto del carrito
const removeItem = async (userId, itemId) => {
  try {
    const result = await db.query(
      "DELETE FROM cart_items WHERE id = $1 AND user_id = $2 RETURNING *",
      [itemId, userId]
    );
    if (!result.rows.length) {
      throw new AppHerror("El item no existe en el carrito.", 404);
    }
    return result.rows[0];
  } catch (err) {
    logger.error(
      `Error eliminando item ${itemId} de usuario ${userId}: ${err.message}`
    );
    if (err instanceof AppHerror) throw err;
    throw new AppHerror("No se pudo eliminar el producto del carrito.", 500);
  }
};

// Limpiar el carrito completo
const clearCart = async (userId) => {
  try {
    await db.query("DELETE FROM cart_items WHERE user_id = $1", [userId]);
    return [];
  } catch (err) {
    logger.error(`Error limpiando carrito usuario ${userId}: ${err.message}`);
    throw new AppHerror("No se pudo limpiar el carrito.", 500);
  }
};

module.exports = {
  getCartByUser,
  addItem,
  updateItem,
  removeItem,
  clearCart,
};
