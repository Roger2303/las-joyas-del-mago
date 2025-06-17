const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cards.controller");

// Listar todas las cartas (con filtros y paginación)
router.get("/cards", cardController.getCards);

// Obtener detalle de una carta por id
router.get("/card/:id", cardController.getCardById);

module.exports = router;
