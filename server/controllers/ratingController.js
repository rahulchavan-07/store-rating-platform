const pool = require("../config/db");

// Submit or update rating
exports.submitRating = async (req, res) => {

  try {
    const { store_id, value } = req.body;
    if (!store_id || !value) {
      return res.status(400).json({ message: "Store ID and value are required" });
    }
    if (value < 1 || value > 5) {
      return res.status(400).json({ message: "Rating must be 1-5" });
    }

    await pool.query(
      `INSERT INTO ratings (user_id, store_id, value)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE value = VALUES(value)`,
      [req.user.id, store_id, value]
    );

    res.json({ message: "Rating submitted/updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get rating of logged-in user for a store
exports.getUserRating = async (req, res) => {
  try {
    const store_id = req.params.store_id;
    const [rows] = await pool.query(
      "SELECT value FROM ratings WHERE user_id=? AND store_id=?",
      [req.user.id, store_id]
    );
    res.json(rows.length ? rows[0] : { value: null });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all ratings (needed in admin.js)
exports.getAllRatings = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.id, r.value AS rating, r.created_at,
             u.name AS user_name, s.name AS store_name
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      JOIN stores s ON r.store_id = s.id
      ORDER BY r.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get average ratings for all stores
exports.getAverageRatings = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT s.id AS store_id, s.name AS store_name,
             ROUND(AVG(r.value), 2) AS averageRating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id, s.name
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get average rating for a single store
exports.getAverageRatingForStore = async (req, res) => {
  try {
    const store_id = req.params.store_id;
    const [rows] = await pool.query(
      "SELECT ROUND(AVG(value), 2) AS averageRating FROM ratings WHERE store_id=?",
      [store_id]
    );
    res.json(rows[0] || { averageRating: null });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
