const pool = require("../config/db");

// Get all ratings + average ratings for stores owned by logged-in owner

exports.getOwnerRatings = async (req, res) => {

  try {
    
    const ownerId = req.user.id;

    // Fetch ratings (who rated + which store)

    const [ratings] = await pool.query(
      `
      SELECT r.id, r.value, r.created_at,
             u.name AS userName,
             s.name AS storeName,
             s.id AS store_id
      FROM ratings r
      JOIN stores s ON r.store_id = s.id
      JOIN users u ON r.user_id = u.id
      WHERE s.owner_id = ?
      ORDER BY r.created_at DESC
      `,
      [ownerId]
    );

    // Fetch average rating per store owned by this owner

    const [avgRatings] = await pool.query(
      `
      SELECT s.id AS store_id, s.name AS storeName,
             ROUND(AVG(r.value), 2) AS averageRating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE s.owner_id = ?
      GROUP BY s.id, s.name
      `,
      [ownerId]
    );

    res.json({ ratings, averageRatings: avgRatings });

  } catch (err) {

    console.error("Error in getOwnerRatings:", err);

    res.status(500).json({ message: err.message });
  }
};
