const axios = require("axios");
const AppHerror = require("../helpers/App.Herror");
const logger = require("../utils/logger");

const API_BASE = "https://api.magicthegathering.io/v1/cards";

const mapCard = (card) => ({
  id: card.id || card.multiverseid || null,
  name: card.name,
  image: card.imageUrl || (card.image_uris && card.image_uris.normal) || null,
  description: card.text || card.oracle_text || "",
  types: card.types || [],
  colors: card.colors || [],
  set: card.set || "",
});

const getCards = async (filters = {}) => {
  try {
    const response = await axios.get(API_BASE, { params: filters });
    return response.data.cards.map(mapCard);
  } catch (error) {
    logger.error(`Error obteniendo cartas: ${error.message}`);
    throw new AppHerror("No se pudo obtener el catálogo de cartas.", 502);
  }
};

const getCardById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`);
    if (!response.data.card) {
      throw new AppHerror("Carta no encontrada", 404);
    }
    return mapCard(response.data.card);
  } catch (error) {
    logger.error(`Error obteniendo carta por id (${id}): ${error.message}`);
    if (error instanceof AppHerror) throw error;
    throw new AppHerror("No se pudo obtener la carta solicitada.", 502);
  }
};

module.exports = { getCards, getCardById };
