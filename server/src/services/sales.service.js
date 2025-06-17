const salesModel = require("../models/sales.model");
const logger = require("../utils/logger");
const AppHerror = require("../helpers/App.Herror");

// ver el carrito (todas las selecciones del usuario)
const getCartByUser = async (userId) => {
  try {
    const cart = await salesModel.getCartByUser(userId);
    return cart;
  } catch (error) {
    if (error instanceof AppHerror) throw error;
    logger.error(`Error en getCartByUser(${userId}): ${error.message}`);
    throw new AppHerror("No se pudo consultar el carrito.", 500);
  }
};

// para agregar producto al carrito
const addItem = async (userId, card) => {
  try {
    if (!card.card_id || !card.card_name || !card.price) {
      logger.warn(
        `Intento de agregar producto incompleto al carrito usuario ${userId}`
      );
      throw new AppHerror("Datos incompletos para agregar al carrito.", 400);
    }

    // Valida la cantidad
    if (
      card.quantity !== undefined &&
      (!Number.isInteger(card.quantity) || card.quantity < 1)
    ) {
      logger.warn(
        `Cantidad inválida (${card.quantity}) al agregar al carrito usuario ${userId}`
      );
      throw new AppHerror(
        "La cantidad debe ser un número entero mayor a 0.",
        400
      );
    }
    // Valida el precio
    if (
      typeof card.price !== "number" ||
      !Number.isInteger(card.price) ||
      card.price < 0
    ) {
      logger.warn(
        `Precio inválido (${card.price}) al agregar al carrito usuario ${userId}`
      );
      throw new AppHerror("El precio debe ser un número entero positivo.", 400);
    }

    const cart = await salesModel.addItem(userId, card);
    return cart;
  } catch (error) {
    if (error instanceof AppHerror) throw error;
    logger.error(`Error en addItem(${userId}): ${error.message}`);
    throw new AppHerror("No se pudo agregar el producto al carrito.", 500);
  }
};

// para modificar cantidad de producto en el carrito
const updateItem = async (userId, itemId, quantity) => {
  try {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new AppHerror("La cantidad debe ser un número mayor a 0.", 400);
    }
    const updated = await salesModel.updateItem(userId, itemId, quantity);
    return updated;
  } catch (error) {
    if (error instanceof AppHerror) throw error;
    logger.error(`Error en updateItem(${userId}, ${itemId}): ${error.message}`);
    throw new AppHerror("No se pudo actualizar el producto del carrito.", 500);
  }
};

// para eliminar productos del carrito por id
const removeItem = async (userId, itemId) => {
  try {
    const removed = await salesModel.removeItem(userId, itemId);
    return removed;
  } catch (error) {
    if (error instanceof AppHerror) throw error;
    logger.error(`Error en removeItem(${userId}, ${itemId}): ${error.message}`);
    throw new AppHerror("No se pudo eliminar el producto del carrito.", 500);
  }
};

// para limpiar el carrito completo
const clearCart = async (userId) => {
  try {
    await salesModel.clearCart(userId);
    return [];
  } catch (error) {
    if (error instanceof AppHerror) throw error;
    logger.error(`Error en clearCart(${userId}): ${error.message}`);
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
