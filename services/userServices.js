const { Router } = require('express');
const express = require('express')
const router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const Sequelize = require('sequelize');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
const db = require("../models/index");
const Joi = require('joi');
var transactions = require('../models/transaction')

const schema = Joi.object().keys({
    name: Joi.string().required(),
    email : Joi.string().required()
})

router.get('', async (req, res) => {
    const response = await db.user.findAll({
        include: [
            {
                model: db.product
            }
            ]
        })
    res.status(200).send({
        messgae: "Router API",
        status: 200,
        data: { response }
        })
})

router.post('/postdata', async (req, res) => {
    const validate = await schema.validateAsync(req.body,
        {
            abortEarly: false,
        });
    if (validate.error) {
        res.status(StatusCodes.BAD_REQUEST).send({
            message: err.message,
            error: err.stack,
            status: StatusCodes.BAD_REQUEST
        })
    }
    else {  
    const reponse = await db.user.create(validate)
    res.status(200).send({
        messgae: "Data added successfully",
        status: 200,
        data: { reponse }
    })
    }
})

router.patch('/updateInformation/:id', async (req, res) => {
    try {
        if (req.body.name && req.body.email) {
            const idToUpdate = req.params.id;
            const response = await db.user.findOne({
                where: { user_id: idToUpdate }
            })
            if (response) {
                const validate = await schema.validateAsync(req.body, {
                    abortEarly: false
                })
                if (!validate) {
                    res.status(422).json({
                        message: 'Invalid request',
                        data: body
                    })
                }
                else {

                    const resp = await db.user.update(req.body, {
                        where: { user_id: idToUpdate }
                    })
                    res.status(200).send({
                        message: "Data added successfully",
                        status: 200,

                    })
                }
            }
            else {
                res.status(404).send({
                    message: "user not found",
                    status: 404,
                    error: "Id with this user not found"
                })
            }
        }
        else {
            res.status(500).send("Please send name and email")
        }
    }
    catch (err) {
        throw new Error(err)
    }


})

router.delete('/deleteAnEntry/:id', async (req, res) => {
    try {
        const response = await db.user.destroy({
            where: { user_id: req.params.id }
        })
        if (response == 1) {
            res.status(200).send({
                message: "Data deleted successfully",
                status: 200
            })
        }
        else {
            res.status(404).send({
                message: "Data with this id is not present",
                status: 404,
                error : "User not found"
                })
        }
    }
    catch (err) {
        throw new Error(err)
    }
})

router.delete('/transactions/:id', async (req, res) => {
    var transsactionResponse = await transactions.transaction(req.params.id)
    if (transsactionResponse!=0) {
        res.status(200).send({
            transsactionResponse,
            status: 200,
            message: "Commited Transaction"
        })
    }
    else {
        res.status(202).send({
            error: { transsactionResponse },
            status: 202,
            message: "Rolled back Transaction"
        })
    }
}) 

module.exports = router;