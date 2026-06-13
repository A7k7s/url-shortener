const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createShortUrl,
  getUserUrls,
  deleteUrl,
  getUrlAnalytics,
  generateQrCode
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
router.post(
  "/:id/generate-qr",
  authMiddleware,
  generateQrCode
);
router.get(
  "/:id/analytics",
  authMiddleware,
  getUrlAnalytics
);
module.exports = router;