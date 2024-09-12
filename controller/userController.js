const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

exports.registerUser = (req, res) => {
  const { email, password, name, surname, profilepic } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = { email, password: hashedPassword, name, surname, profilepic };

  userModel.createUser(newUser, (err, userId) => {
    if (err) return res.status(500).send(err);
    
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  userModel.getUserByEmail(email, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.idusers }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};

exports.getUserProfile = (req, res) => {
  const userId = req.user.id;

  userModel.getUserById(userId, (err, user) => {
    if (err) return res.status(500).send(err);
    res.json(user);
  });
};
