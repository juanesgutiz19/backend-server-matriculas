const { response } = require('express');
const bcrypt = require('bcryptjs');

const Degree = require('../models/degree');
const { generateJWT } = require('../helpers/jwt');


const createDegree = async(req, res = response) => {

    try {
        const degree = new Degree(req.body);

        await degree.save();

        res.json({
            ok: true,
            degree
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }
};

module.exports = {
    createDegree,
};