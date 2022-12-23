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
var transactions = require('../models/transaction');
const { product } = require('../models/index');

const schema = Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.string().required(),
    associate_id: Joi.number().required()
})

productservices.get('/', async(req, res) => {
    try {
        var response = await model.product.findAll({
            include: [
                {
                    model: model.user
                    }
                ]
            });
        res.status(200).send(response)
    }
    catch (err) {
        throw new Error (err)
    }
})

productservices.post('/post', async (req, res) => {
    try {
        if (req.body.name && req.body.category && req.body.associate_id) {
            const validate = await schema.validateAsync(req.body,
                {
                    abortEarly: false,
                });
            if (validate.error) {
                res
                    .status(505)
                    .send({
                        status: 505,
                        error: validate.error,
                        message: "Data is not validated"
                    })
            }
            else {
                const response = await model.product.create(validate)
                res
                    .status(200)
                    .send({
                        status: 200,
                        message: "Data added successFully",
                        response
                    })
            }
        }
        else {
            res
                .status(404)
                .send({
                    message: 'Missing Field > Name | Category | associate_id',
                    err: 404
                })
        }
    }
    catch (err) {
        throw new Error(err)
    }
})

productservices.delete('/delete/:id', async (req,res) => {
    try {
        const response = await model.product.destroy({
            where: {product_id : req.params.id}
        })
        if (response == 1) {
            res
                .status(200)
                .send({
                    message: "deleted Successfully",
                    status: 200,
                    response
                })
        }
        else {
            res
                .status(400)
                .send({
                    message: "ID not found",
                    status: 400,
                    response
                })
        }
        }
    catch (err) {
        throw new Error(err)
        }
})

productservices.patch('/update/:id', async (req, res) => {
    if (req.body.name && req.body.category && req.body.associate_id) {
        try {
            const response = await model.product.findOne({
                where: {product_id : req.params.id }
            })
            if (response) {
                const validate = await schema.validateAsync(req.body, {
                    abortEarly: false
                })
                if (validate.error) {

                }
                else {
                    const respnse = await model.product.update(validate, {
                        where: { product_id: req.params.id }
                    })
                    res
                        .status(200)
                        .send({
                            message: "Data updated successfully",
                            status: 200,
                            respnse
                        })
                }

            }
            else {
                res.status(404).send({ message: " ID not found ", status: 404, response })
            }
        }
        catch(err) {
            throw new Error (err)
        }
    }
    else {
        res.status(400).send({message:"data missing in body"})
    }
})

productservices.delete('/deleteall', async (req, res) => {
    const response = await model.product.destroy({
        where: {},
        truncate: true
    })
    if (response == 0) {
        res.status(200).send({
            message: "Delete all data successfully",
            status: 200,
            response
        })
    }
    else {
        res.status(505).send({
            message: "error deleting data",
            status: 200,
            error: 200
        })
    }
})

module.exports = productservices;