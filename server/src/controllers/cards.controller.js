const cardService = require("../services/cards.service");

const getCards = async (req, res, next) => {
  try {
    const filters = req.query;
    const page = parseInt(filters.page) || 1;
    const pageSize = parseInt(filters.pageSize) || 20;

    const cards = await cardService.getCards(filters);

    res.status(200).json({
      page,
      pageSize,
      hasMore: cards.length === pageSize,
      data: cards,
    });
  } catch (err) {
    next(err);
  }
};

const getCardById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await cardService.getCardById(id);
    res.status(200).json(card);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCards,
  getCardById,
};
