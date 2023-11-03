const path = require("path");
const pets = require("../../data/petList");

const showHome = (req, res, next) => {
  const petTypes = Object.keys(pets);

  res.render("home.pug", { animals: petTypes });
};

module.exports = showHome;
