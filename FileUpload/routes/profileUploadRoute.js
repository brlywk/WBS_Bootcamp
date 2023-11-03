const { Router } = require("express");
const { upload, uploadDir } = require("../utils/multerSetup");
const { addPicture } = require("../utils/db");

const profilePicUploadRouter = Router();

profilePicUploadRouter.route("/upload-profile-pic").post(upload.single("profile_pic"), (req, res, _next) => {
  if (!req.file) {
    return res.status(400).send("Upload failed, no file found.");
  }

  const originalFileName = req.file.originalname;
  const filePath = `/${uploadDir}/${req.file.filename}`;

  addPicture(originalFileName, filePath, (result) => {
    if (result.success) {
      res.send(`<a href="/get-pics">Show uploaded pictures</a><br /><div><img src="${filePath}" /></div>`);
    } else {
      throw new Error(result.message);
    }
  });
});

// Error Handling for route
profilePicUploadRouter.use((err, req, res, _next) => {
  return res.status(400).send(`Error: ${err.message}`);
});

module.exports = profilePicUploadRouter;
