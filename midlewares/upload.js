const multer = require("multer");
const path = require("path");

const { HttpError } = require("../helpers");

const tempDir = path.join(__dirname, "../", "temp");
const maxAvatarSize = 9000000;

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/bmp"
  ) {
    cb(null, true);
    return;
  }

  cb(null, false);

  cb(HttpError(400, "File format should be jpeg, png, jpg, bmp"));
}
const upload = multer({
  storage: multerConfig,
  limits: { fileSize: maxAvatarSize },
  fileFilter,
});
module.exports = upload;
