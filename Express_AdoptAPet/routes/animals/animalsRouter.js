const { Router } = require("express");
const animalListController = require("./animalListController");
const animalEntryController = require("./animalEntryController");

const animalsRouter = Router();

// route: /:animal
animalsRouter.get("/:animal", animalListController);

// route: /:animal/:id
animalsRouter.get("/:animal/:id", animalEntryController);

module.exports = animalsRouter;
