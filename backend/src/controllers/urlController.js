const pool = require("../config/db");
const QRCode = require("qrcode");
const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, customAlias } = req.body;

    let shortCode;

    if (customAlias) {

        const existingAlias = await pool.query(
            `
            SELECT *
            FROM urls
            WHERE short_code = $1
            `,
            [customAlias]
        );

        if (existingAlias.rows.length > 0) {
            return res.status(400).json({
            message: "Alias already exists",
            });
        }
        shortCode = customAlias;
    } else {
        shortCode = Math.random()
        .toString(36)
        .substring(2, 8);
    }

    const userId = req.user.userId;

    const result = await pool.query(
      `
      INSERT INTO urls
      (
        original_url,
        short_code,
        custom_alias,
        user_id
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [originalUrl,shortCode,customAlias || null,userId]
    );

    res.status(201).json({
      message: "Short URL created",
      data: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getUserUrls = async (req, res) => {
  try {

    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT *
      FROM urls
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }
};

const deleteUrl = async (req, res) => {
  try {

    const urlId = req.params.id;
    const userId = req.user.userId;

    await pool.query(
      `
      DELETE FROM visits
      WHERE url_id = $1
      `,
      [urlId]
    );

    const result = await pool.query(
      `
      DELETE FROM urls
      WHERE id = $1
      AND user_id = $2
      RETURNING *
      `,
      [urlId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "URL not found or access denied",
      });
    }

    res.json({
      message: "URL deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }
};

const redirectUrl = async (req, res) => {
  try {

    const shortCode = req.params.shortCode;

    const result = await pool.query(
      `
      SELECT *
      FROM urls
      WHERE short_code = $1
      `,
      [shortCode]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "URL not found",
        });
    }
    await pool.query(
      `
      INSERT INTO visits (url_id)
      VALUES ($1)
      `,
      [result.rows[0].id]
    );
    await pool.query(
        `
        UPDATE urls
        SET clicks = clicks + 1
        WHERE id = $1
        `,
        [result.rows[0].id]
    );

    res.redirect(
        result.rows[0].original_url
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }
};

const getUrlAnalytics = async (req, res) => {
  try {

    const urlId = req.params.id;
    const userId = req.user.userId;

    const urlResult = await pool.query(
      `
      SELECT *
      FROM urls
      WHERE id = $1
      AND user_id = $2
      `,
      [urlId, userId]
    );

    if (urlResult.rows.length === 0) {
      return res.status(404).json({
        message: "URL not found"
      });
    }

    const visitsResult = await pool.query(
      `
      SELECT *
      FROM visits
      WHERE url_id = $1
      ORDER BY visited_at DESC
      `,
      [urlId]
    );

    res.json({
      url: urlResult.rows[0],
      totalVisits: visitsResult.rows.length,
      visits: visitsResult.rows
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};

const generateQrCode = async (req, res) => {
  try {

    const urlId = req.params.id;
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT *
      FROM urls
      WHERE id = $1
      AND user_id = $2
      `,
      [urlId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "URL not found or access denied",
      });
    }

    const shortCode = result.rows[0].short_code;

    const shortUrl =
      `http://localhost:5000/${shortCode}`;

    const qrCodeUrl =
      await QRCode.toDataURL(shortUrl);

    await pool.query(
      `
      UPDATE urls
      SET qr_code_url = $1
      WHERE id = $2
      `,
      [qrCodeUrl, urlId]
    );

    res.json({
      message: "QR Code generated",
      qrCodeUrl,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }
};

module.exports = {
  createShortUrl,
  getUserUrls,
  deleteUrl,
  redirectUrl,
  generateQrCode,
  getUrlAnalytics,
};