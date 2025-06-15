const userService = require("../services/user.service");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const result = await userService.register({ name, email, password });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { register };
