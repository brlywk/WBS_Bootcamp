const multer = require("multer");
const path = require("path");

const uploadDir = "uploads";
const uploadPath = path.join(__dirname, `../${uploadDir}`);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uploadDateTime = new Date().toISOString().replace(/:/g, "-");
    const fileName = uploadDateTime + "_" + file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const extensionRegex = /\.(jpg|jpeg|png|gif|webp)$/i;
  const matches = file.originalname.match(extensionRegex);

  if (matches) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type for file '${file.originalname}'`), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = {
  uploadDir,
  uploadPath,
  upload,
};
