const express = require("express");
const router = express.Router();
const salesController = require("../controllers/sales.controller");
const authMiddleware = require("../midlewares/auth.midleware");

// todas las rutas del carrito requieren usuario autenticado
router.use(authMiddleware);

// Ver el carrito en el estado actual del usuario
router.get("/cart", salesController.getCart);

// Agregar un producto al carrito
router.post("/cart", salesController.addItem);

// Modificar cantidad de un producto por el id del item
router.put("/cart/:itemId", salesController.updateItem);

// Eliminar un producto del carrito por id
router.delete("/cart/:itemId", salesController.removeItem);

// Limpiar el carrito completo
router.delete("/cart", salesController.clearCart);

module.exports = router;
