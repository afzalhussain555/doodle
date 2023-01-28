const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {getConnection}= require('../db.js');;
const { v4: uuidv4 } = require('uuid');
router.use(express.json())

router.post('/order', (req, res) => {
    let {productId, userId, quantity} = req.body;
    const insertQuery = `INSERT INTO \`Order\` () VALUES (?, ?, ?, ?)`;
    const connection = getConnection();
    connection.query(insertQuery, [uuidv4(),productId,userId,quantity], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            connection.query(`UPDATE Product SET quantity = quantity - ${quantity} WHERE id = "${productId}"`, (error, results) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    res.send({ message: "Order placed successfully" });
                }
            });
        }
    });
});

router.get('/product/:id', (req, res) => {
    let productId = req.params.id;
    const connection = getConnection();
    const selectQuery = `SELECT * FROM Product WHERE id = ?`;
    connection.query(selectQuery, [productId], (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(results);
        }
    });
});

router.get('/product/:id', (req, res) => {
    let productId = req.params.id;
    connection.query(`SELECT * FROM Product WHERE id = ${productId}`, (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(results);
        }
    });
});

router.get('/user/:id/orders', (req, res) => {
    let userId = req.params.id;
    const connection = getConnection();
    connection.query(`SELECT \`Order\`.id, \`Order\`.quantity, \`Product\`.name FROM \`Order\` INNER JOIN Product ON \`Order\`.product_id = Product.id WHERE \`Order\`.user_id = ?`,[userId], (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(results);
        }
    });
});



router.listen(3001, () => {
    console.log(`DoodleExample app listening on port 3001`)
  })