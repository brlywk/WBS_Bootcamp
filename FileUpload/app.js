const express = require("express");
const path = require("path");
const { uploadDir, uploadPath } = require("./utils/multerSetup");

const staticDir = "static";
const staticPath = path.join(__dirname, staticDir);

const app = express();

app.use(express.static(staticPath));
app.use(`/${uploadDir}`, express.static(uploadPath));
app.set("view engine", "pug");

// ===== Routes ===== //
// home /
const homeRouter = require("./routes/homeRoute");
app.use(homeRouter);

// upload profile picture /upload-profile-pic
const profilePicUploadRouter = require("./routes/profileUploadRoute");
app.use(profilePicUploadRouter);

// fueling the internet /upload-cat-pics
const catPicsUploadRouter = require("./routes/catPicsUploadRoute");
app.use(catPicsUploadRouter);

// get all pictures /get-pics
const getPicturesRouter = require("./routes/getPicturesRoute");
app.use(getPicturesRouter);

// ===== Start server ===== //
app.listen(3000, () => console.log(`Server running on localhost:${3000}`));
