const pool = require("../config/db");

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

module.exports = {
  createShortUrl,
};