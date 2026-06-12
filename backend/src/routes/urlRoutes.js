const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createShortUrl,
  getUserUrls,
  deleteUrl,
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
router.delete(
  "/:id",
  authMiddleware,
  deleteUrl
);
module.exports = router;