const { Router } = require("express");
const { uploadDir, upload } = require("../utils/multerSetup");
const { addMultiplePictures } = require("../utils/db");

const catPicsUploadRouter = Router();

catPicsUploadRouter.route("/upload-cat-pics").post(upload.array("cat_pics"), (req, res, _next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("Upload failed, no file(s) found.");
  }

  const pictures = [];

  req.files.forEach((f) => {
    pictures.push({
      name: f.originalname,
      path: `/${uploadDir}/${f.filename}`,
    });
  });

  addMultiplePictures(pictures, (result) => {
    if (result.success) {
      const shouldveUsedATemplate = `
        <a href="/get-pics">Show uploaded pictures</a><br />
        <div>
        ${req.files.map((f) => `<img src="/${uploadDir}/${f.filename}" />`).join()}
        </div>
      `;

      res.send(shouldveUsedATemplate);
    } else {
      res.status(500).send(result.message);
    }
  });
});

// Error Handling for route
catPicsUploadRouter.use((err, req, res, _next) => {
  return res.status(400).send(`Error: ${err.message}`);
});

module.exports = catPicsUploadRouter;
