const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createShortUrl,
} = require("../controllers/urlController");

router.post(
  "/",
  authMiddleware,
  createShortUrl
);

module.exports = router;