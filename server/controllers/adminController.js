const pool = require("../config/db");
const bcrypt = require("bcrypt");

// dashboard :

exports.dashboard = async (req, res) => {

  try {
    const [[users]] = await pool.query(
      "SELECT COUNT(*) as totalUsers FROM users"
    );
    const [[stores]] = await pool.query(
      "SELECT COUNT(*) as totalStores FROM stores"
    );
    const [[ratings]] = await pool.query(
      "SELECT COUNT(*) as totalRatings FROM ratings"
    );

    res.json({
      totalUsers: users.totalUsers,
      totalStores: stores.totalStores,
      totalRatings: ratings.totalRatings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create user :

exports.createUser = async (req, res) => {

  try {

    const { name, email, address, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, address, password, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, address, hashed, role]
    );
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create store :


exports.createStore = async (req, res) => {

  try {

    const { name, location, ownerId } = req.body;

    await pool.query(
      "INSERT INTO stores (name, location, owner_id) VALUES (?, ?, ?)",
      [name, location, ownerId]
    );

    res.status(201).json({ message: "Store created" });

  } catch (err) {

    res.status(500).json({ message: err.message });
  }
};

// get users :


exports.getUsers = async (req, res) => {
  try {
    const { id, name, email, address, role } = req.query;

    let query = "SELECT id, name, email, address, role FROM users WHERE 1=1";
    const params = [];

    if (id) {
      query += " AND id = ?";
      params.push(id);
    }
    if (name) {
      query += " AND name LIKE ?";
      params.push(`%${name}%`);
    }
    if (email) {
      query += " AND email LIKE ?";
      params.push(`%${email}%`);
    }
    if (address) {
      query += " AND address LIKE ?";
      params.push(`%${address}%`);
    }
    if (role) {
      query += " AND role = ?";
      params.push(role);
    }

    const [users] = await pool.query(query, params);
    res.json(users);

  } catch (err) {

    res.status(500).json({ message: err.message });
  }
};

// get stores :

exports.getStores = async (req, res) => {

  try {

    const { id, name, location, email } = req.query;

    let query = `
      SELECT s.id, s.name, s.location,
             u.name as ownerName, u.email as ownerEmail,
             COALESCE(ROUND(AVG(r.value), 2), 0) AS rating
      FROM stores s
      JOIN users u ON s.owner_id = u.id
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE 1=1
    `;
    const params = [];

    if (id) {
      query += " AND s.id = ?";
      params.push(id);
    }
    if (name) {
      query += " AND s.name LIKE ?";
      params.push(`%${name}%`);
    }
    if (location) {
      query += " AND s.location LIKE ?";
      params.push(`%${location}%`);
    }
    if (email) {
      query += " AND u.email LIKE ?";
      params.push(`%${email}%`);
    }

    query += " GROUP BY s.id";

    const [stores] = await pool.query(query, params);

    res.json(stores);

  } catch (err) {

    res.status(500).json({ message: err.message });
  }
};
