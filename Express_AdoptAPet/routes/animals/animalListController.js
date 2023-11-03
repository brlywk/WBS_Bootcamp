const pets = require("../../data/petList");

const animalList = (req, res, next) => {
  const animalType = req.params.animal;
  const animalList = pets[animalType];

  res.render("list.pug", { animalType, animals: animalList });
};

module.exports = animalList;
