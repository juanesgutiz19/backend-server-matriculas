const { response } = require('express');
const bcrypt = require('bcryptjs');

const Degree = require('../models/degree');
const { generateJWT } = require('../helpers/jwt');


const getDegrees = async(req, res = response) => {

    const degrees = await Degree.find();

    res.json({
        ok: true,
        degrees
    });
};

const getDegreeByName = async(req, res = response) => {

    const degree = req.params.name;
    const degrees = await Degree.find({ degree });
    if (degrees.length === 0) {
        return res.status(404).json({
            ok: true,
            msg: 'No hay un degree con ese nombre',
        });
    }

    res.json({
        ok: true,
        degrees
    });
};


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

const updateDegree = async(req, res = response) => {

    const degreeId = req.params.id;

    try {

        const degreeDB = await Degree.findById(degreeId);

        if (!degreeDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un grado con ese id'
            });
        }

        // Actualizaciones
        const { degree, ...fields } = req.body;

        if (degreeDB.degree !== degree) {

            const existsDegree = await Degree.findOne({ degree });
            if (existsDegree) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un grado con ese nombre'
                });
            }
        }

        fields.degree = degree;

        const updatedDegree = await Degree.findByIdAndUpdate(degreeId, fields, { new: true });

        res.json({
            ok: true,
            usuario: updatedDegree
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        });
    }
};

module.exports = {
    getDegrees,
    createDegree,
    updateDegree,
    getDegreeByName
};