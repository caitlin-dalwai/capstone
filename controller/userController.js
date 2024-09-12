const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.registerUser = (req, res) => {
  const { email, password, name, surname, profilepic } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    'INSERT INTO users (email, password, name, surname, profilepic) VALUES (?, ?, ?, ?, ?)',
    [email, hashedPassword, name, surname, profilepic],
    (err, result) => {
      if (err) return res.status(500).send(err);
      const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ token });
    }
  );
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send(err);
    if (!results.length || !bcrypt.compareSync(password, results[0].password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: results[0].idusers }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};

exports.getUserProfile = (req, res) => {
  const userId = req.user.id;
  db.query('SELECT * FROM users WHERE idusers = ?', [userId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
};
