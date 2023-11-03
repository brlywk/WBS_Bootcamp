require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT || 3000;
const staticPath = path.join(__dirname, "static");

app.use(express.static(staticPath));
app.use(express.json());

app.set("view engine", "pug");

// route /api/countries
const countriesRouter = require("./routes/countriesRouter");
app.use("/api/countries", countriesRouter);

// route /api
app.use("/api", (req, res, next) => {
  next();
});

// route /
app.use("/", (req, res, next) => {
  res.status(404).send(
    "Nothing to see here. Please use /api/countries to get started",
  );
});

app.listen(port, () => console.log(`Server running on localhost:${port}`));
