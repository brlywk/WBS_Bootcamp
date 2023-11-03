require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

// basic settings
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// import routers
const homeRouter = require("./routes/home/homeRouter");
const animalsRouter = require("./routes/animals/animalsRouter");

// use pug
app.set("view engine", "pug");

// home route '/'
app.use("/", homeRouter);

// spicy... we also want to have a top level route
// to animals, e.g. /dogs so we need to have a route for / again
app.use("/", animalsRouter);

app.listen(port, () => console.log(`Server running on localhost:${port}`));
