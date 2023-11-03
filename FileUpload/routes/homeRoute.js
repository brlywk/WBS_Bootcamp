const { Router } = require("express");
const homeRouter = Router();

homeRouter.route("/").get((req, res, _next) => {
  res.status(200).sendFile("index.html");
});

module.exports = homeRouter;
