const cardModel = require("../models/cards.model");
const logger = require("../utils/logger");
const AppHerror = require("../helpers/App.Herror");

const TYPE_PRICES = {
  Creature: 20000,
  Sorcery: 12000,
  Enchantment: 15000,
  Artifact: 17000,
  Planeswalker: 19000,
  Land: 10000,
  Instant: 12000,
};

function getPriceForType(types = []) {
  const mainType = types[0];
  return TYPE_PRICES[mainType] || 10000;
}

// Límite total de cartas que manejará la API propia por consulta
const MAX_CARDS = 60;

const getCards = async (filters = {}) => {
  try {
    // Leer paginación del filtro, o defaults
    const page = parseInt(filters.page) || 1;
    const pageSize = parseInt(filters.pageSize) || 20;

    // Traer todas las cartas del model (la API externa puede ignorar page/pageSize)
    const allCards = await cardModel.getCards(filters);

    if (!allCards.length) {
      logger.warn(
        `No se encontraron cartas para filtros: ${JSON.stringify(filters)}`
      );
      throw new AppHerror(
        "No se encontraron cartas para los filtros aplicados.",
        404
      );
    }

    // Limita a máximo 60 resultados
    const limitedCards = allCards.slice(0, MAX_CARDS);

    // Paginación en memoria
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const cardsPage = limitedCards.slice(start, end);

    // Enriquecer con price
    const enriched = cardsPage.map((card) => ({
      ...card,
      price: getPriceForType(card.types),
    }));

    const hasMore = end < limitedCards.length;

    return {
      page,
      pageSize,
      hasMore,
      total: limitedCards.length,
      data: enriched,
    };
  } catch (error) {
    if (error instanceof AppHerror) throw error;
    logger.error(`Error inesperado en getCards: ${error.message}`);
    throw new AppHerror(
      "Ocurrió un error al consultar el catálogo de cartas.",
      500
    );
  }
};

const getCardById = async (id) => {
  try {
    if (!id) {
      logger.warn("Intento de consulta de carta sin id");
      throw new AppHerror("El id de la carta es obligatorio.", 400);
    }

    const card = await cardModel.getCardById(id);

    return {
      ...card,
      price: getPriceForType(card.types),
    };
  } catch (error) {
    if (error instanceof AppHerror) throw error;
    logger.error(`Error inesperado en getCardById(${id}): ${error.message}`);
    throw new AppHerror("Ocurrió un error al consultar la carta.", 500);
  }
};

module.exports = {
  getCards,
  getCardById,
};
