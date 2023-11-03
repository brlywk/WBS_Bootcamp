const fileAccess = require("../data/fileAccess");
const { validationResult } = require("express-validator");

const getAllCountries = (req, res, next) => {
  const sorting = req.query?.sort?.toString().toLowerCase();

  fileAccess.getCountryListFromFile()
    .then((result) => {
      const countries = result.countries;

      if (!sorting || sorting === "asc") {
        countries.sort((a, b) => a.name > b.name ? 1 : -1);
      } else {
        countries.sort((a, b) => a.name > b.name ? -1 : 1);
      }

      // res.status(200).send(countries);
      res.status(200).render("countrylist.pug", { countries });
    })
    .catch((err) => {
      return res.status(500).send(err.message);
    });
};

const postNewCountry = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  const newCountry = req.body;

  fileAccess.getCountryListFromFile()
    .then((result) => {
      const countryList = result.countries;
      // Todo: Should also check alpha-3 code
      const alreadyInList = countryList.findIndex((c) =>
        c.alpha2.toLowerCase() === newCountry.alpha2.toLowerCase()
      );

      if (alreadyInList === -1) {
        countryList.push(newCountry);
      } else {
        throw new Error(
          `Country with code ${newCountry.alpha2} already exists`,
        );
      }

      fileAccess.writeCountryListToFile(countryList)
        .then(() => {
          res.status(200).send("Successfully updated list");
        })
        .catch((err) => {
          return res.status(500).send(
            `An error occured while updating the country list: ${err.message}`,
          );
        });
    })
    .catch((err) => {
      res.status(400).send(`Error: ${err.message}`);
    });
};

module.exports = { getAllCountries, postNewCountry };
