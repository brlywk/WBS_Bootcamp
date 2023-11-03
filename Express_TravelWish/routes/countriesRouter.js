const { Router } = require("express");
const { body, param } = require("express-validator");

const countriesRouter = Router();

const countryBodyValidation = [
  body("id").isInt().withMessage("id must be an integer"),
  body("name").isString().withMessage("name must be a string"),
  body("alpha2").isString().isLength({ min: 2, max: 2 }).withMessage(
    "alpha2 must be a string of length 2",
  ),
  body("alpha3").isString().isLength({ min: 3, max: 3 }).withMessage(
    "alpha3 must be a string of length 3",
  ),
  body("visited").optional().isBoolean().withMessage(
    "optional field visited must be a boolean",
  ),
];

const countryCodeParamValidation = [
  param("code").isString().isLength({ min: 2, max: 3 }).withMessage(
    "Parameter has to be an alpha-2 or alpha-3 code (length of 2 or 3 characters)",
  ),
];

const countriesController = require("./countriesController");
countriesRouter.route("/")
  .get(countriesController.getAllCountries)
  .post(countryBodyValidation, countriesController.postNewCountry);

const countryCodeController = require("./countryCodeController");
countriesRouter.route("/:code")
  .get(countryCodeParamValidation, countryCodeController.getCountryByCode)
  .put(
    [...countryCodeParamValidation, ...countryBodyValidation],
    countryCodeController.editCountryByCode,
  )
  .delete(
    countryCodeParamValidation,
    countryCodeController.deleteCountryByCode,
  );

countriesRouter.route("/toggle/:code")
  .delete(
    countryCodeParamValidation,
    countryCodeController.toggleVisitedByCode,
  );

module.exports = countriesRouter;
