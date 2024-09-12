const db = require('../config/db');

exports.createUser = (userData, callback) => {
  const { email, password, name, surname, profilepic } = userData;
  db.query(
    'INSERT INTO users (email, password, name, surname, profilepic) VALUES (?, ?, ?, ?, ?)',
    [email, password, name, surname, profilepic],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.insertId);
    }
  );
};

exports.getUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]); 
  });
};

exports.getUserById = (userId, callback) => {
  db.query('SELECT * FROM users WHERE idusers = ?', [userId], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]); 
  });
};
