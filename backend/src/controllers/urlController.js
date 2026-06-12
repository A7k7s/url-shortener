const pool = require("../config/db");

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    const shortCode = Math.random()
      .toString(36)
      .substring(2, 8);

    const userId = req.user.userId;

    const result = await pool.query(
      `
      INSERT INTO urls
      (
        original_url,
        short_code,
        user_id
      )
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [originalUrl, shortCode, userId]
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

module.exports = {
  createShortUrl,
};