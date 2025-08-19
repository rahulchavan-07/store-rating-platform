const pool = require('../config/db');

// List all stores with average rating + user’s rating

exports.listStores = async (req, res) => {

  try {

    const [stores] = await pool.query(`
      SELECT s.id, s.name, s.location,
        COALESCE(ROUND(AVG(r.value), 2), 0) AS averageRating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
    `);

    // Ensure averageRating is number (not string)

    for (let store of stores) {

      store.averageRating = parseFloat(store.averageRating);

      const [userRating] = await pool.query(

        "SELECT value FROM ratings WHERE store_id=? AND user_id=?",
        [store.id, req.user.id]
      );
      store.userRating = userRating.length ? userRating[0].value : null;
    }

    res.json(stores);
    
  } catch (err) {
    console.error("Error in listStores:", err);
    res.status(500).json({ message: err.message });
  }
};
