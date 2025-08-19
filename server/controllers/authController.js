const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// signup :


exports.signup = async (req, res) => {

  try {

    const { name, email, address, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (name, email, address, password, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, address, hashed, 'USER']
    );

    res.status(201).json({ message: 'User registered' });

  } catch (err) {

    res.status(500).json({ message: err.message });
  }
};

// login :

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const [rows] = await pool.query('SELECT * FROM users WHERE email=?', [email]);

    if (!rows.length) return res.status(400).json({ message: 'Invalid credentials' });

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

   
    res.json({
      message: 'Login successful',
      token,         
      role: user.role 
    });

  } catch (err) {

    res.status(500).json({ message: err.message });
  }
};

// logout :


exports.logout = (req, res) => {
  
  res.json({ message: 'Logged out' });
};

//change passsword :

exports.changePassword = async (req, res) => {

  try {

    const { oldPassword, newPassword } = req.body;

    const [rows] = await pool.query('SELECT * FROM users WHERE id=?', [req.user.id]);

    const user = rows[0];

    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) return res.status(400).json({ message: 'Old password incorrect' });

    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.query('UPDATE users SET password=? WHERE id=?', [hashed, req.user.id]);

    res.json({ message: 'Password updated' });

  } catch (err) {

    res.status(500).json({ message: err.message });
  }
};
