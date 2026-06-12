const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createShortUrl,
  getUserUrls,
} = require("../controllers/urlController");

router.post(
  "/",
  authMiddleware,
  createShortUrl
);
router.get(
  "/",
  authMiddleware,
  getUserUrls
);

module.exports = router;