const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {getConnection}= require('../db.js');;
const { v4: uuidv4 } = require('uuid');
router.use(express.json())

router.post('/signup', (req, res) => {
    console.log(req.body);
  const { name, email, password, gender, dob } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const insertQuery = `INSERT INTO User () VALUES (?, ?, ?, ?, ?,?)`;
  const connection = getConnection();
  connection.query(insertQuery, [uuidv4(), name, email, hashedPassword, gender, dob], (err, results) => {
    if (err) {
        console.log(err);
      return res.status(500).json({
        message: 'Error while creating user'
      });
    }
    return res.status(201).json({
      message: 'User created successfully'
    });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const selectQuery = `SELECT * FROM User WHERE email = ?`;
  const connection = getConnection();
  connection.query(selectQuery, [email], (err, results) => {
    if (err) {
        console.log(err);
      return res.status(500).json({
        message: 'Error while logging in'
      });
    }
    if (!results.length) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }
    const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
    return res.status(200).json({
      message: 'Logged in successfully',
      token
    });
  });
});

router.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
  })