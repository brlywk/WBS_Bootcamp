const pets = require("../../data/petList");

const animalEntry = (req, res, next) => {
  const animalType = req.params.animal;
  const animalList = pets[animalType];
  const animal = animalList[req.params.id];

  res.render("entry.pug", { animal, animalType });
};

module.exports = animalEntry;
