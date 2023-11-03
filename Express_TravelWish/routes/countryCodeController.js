const fileAccess = require("../data/fileAccess");
const { validationResult } = require("express-validator");

const getCountryByCode = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  const countryCode = req.params.code;
  const searchProp = countryCode.length === 2 ? "alpha2" : "alpha3";

  fileAccess.getCountryListFromFile()
    .then((result) => {
      const countries = result.countries;

      const country = countries.find((c) =>
        c[searchProp].toLowerCase() === countryCode.toLowerCase()
      );
      let retVal = country ||
        { message: `No country with code ${countryCode} found.` };

      return res.status(200).json(retVal);
    })
    .catch((err) => {
      return req.status(400).send(`Unexpected error: ${err.message}`);
    });
};

const editCountryByCode = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  const newCountry = req.body;

  fileAccess.getCountryListFromFile()
    .then((result) => {
      const countries = result.countries;
      const countryCode = req.params.code;

      // Todo: Should also check alpha-3 code
      const alreadyInList = countries.findIndex((c) =>
        c.alpha2.toLowerCase() === newCountry.alpha2.toLowerCase()
      );

      if (alreadyInList === -1) {
        throw new Error(`No country found with code ${countryCode}`);
      }

      countries[alreadyInList] = newCountry;

      fileAccess.writeCountryListToFile(countries)
        .then(() => {
          res.status(200).send(
            `Successfully updated country: ${JSON.stringify(newCountry)}`,
          );
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      res.status(400).send(`Error: ${err.message}`);
    });
};

const deleteCountryByCode = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  fileAccess.getCountryListFromFile()
    .then((result) => {
      const countries = result.countries;
      const countryCode = req.params.code;

      // Todo: Should also check alpha-3 code
      const alreadyInList = countries.findIndex((c) =>
        c.alpha2.toLowerCase() === countryCode.toLowerCase()
      );

      if (alreadyInList === -1) {
        throw new Error(`No country found with code ${countryCode}`);
      }

      countries.splice(alreadyInList, 1);

      fileAccess.writeCountryListToFile(countries)
        .then(() => {
          res.status(200).send(
            `Successfully removed country with code ${countryCode}`,
          );
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      res.status(400).send(`Error: ${err.message}`);
    });
};

const toggleVisitedByCode = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  fileAccess.getCountryListFromFile()
    .then((result) => {
      const countries = result.countries;
      const countryCode = req.params.code;

      // Todo: Should also check alpha-3 code
      const alreadyInList = countries.findIndex((c) =>
        c.alpha2.toLowerCase() === countryCode
      );

      if (alreadyInList === -1) {
        throw new Error(`No country found with code ${countryCode}`);
      }

      const visitedOld = countries[alreadyInList].visited ?? false;
      countries[alreadyInList].visited = !visitedOld;

      fileAccess.writeCountryListToFile(countries)
        .then(() => {
          res.status(200).send(
            `Successfully updated ${countryCode}: ${visitedOld} -> ${!visitedOld}`,
          );
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      res.status(400).send(`Error: ${err.message}`);
    });
};

module.exports = {
  getCountryByCode,
  editCountryByCode,
  deleteCountryByCode,
  toggleVisitedByCode,
};
