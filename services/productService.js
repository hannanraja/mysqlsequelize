const model = require('../models/index')
const { Router } = require('express');
const express = require('express')
const productservices = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const Sequelize = require('sequelize');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
productservices.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
const Joi = require('joi');
var transactions = require('../models/transaction')

productservices.get('/', async(req, res) => {
    try {
        var response = await model.product.findAll({
            subQuery:false
            });
        res.status(200).send(response)
    }
    catch (err) {
        throw new Error (err)
    }
})

module.exports = productservices;