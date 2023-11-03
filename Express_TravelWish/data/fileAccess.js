const fs = require("fs").promises;
const path = require("path");

const countryFile = path.join(__dirname, "countries.json");

const getCountryListFromFile = async () => {
  const fileContent = await fs.readFile(countryFile, "utf8");
  return JSON.parse(fileContent);
};

const writeCountryListToFile = async (newList) => {
  const countryObject = { countries: newList };
  const stringData = JSON.stringify(countryObject, null, 2);
  const success = await fs.writeFile(countryFile, stringData, "utf8");

  return success;
};

module.exports = { getCountryListFromFile, writeCountryListToFile };
