const { Router } = require("express");
const showHome = require("./homeController");

const homeRouter = Router();

// unnecessary to write it like this, but still good to practice
homeRouter.route("/")
  .get(showHome);

module.exports = homeRouter;
