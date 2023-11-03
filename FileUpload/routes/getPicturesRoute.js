const { Router } = require("express");
const { getPictures } = require("../utils/db");

const getPicuresRouter = Router();

getPicuresRouter.route("/get-pics").get((req, res, _next) => {
  getPictures((result) => {
    if (result.success) {
      res.status(200).render("pictures.pug", { pictures: result.pictures });
    } else {
      res.status(500).send(result.message);
    }
  });
});

module.exports = getPicuresRouter;
