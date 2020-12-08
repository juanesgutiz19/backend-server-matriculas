const { response } = require('express');
const bcrypt = require('bcryptjs');

const Student = require('../models/student');

const getStudents = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getStudents'
    });
};

const createStudent = async(req, res = response) => {

    const { identityDocument } = req.body;
    const id = identityDocument;


    try {

        const existsId = await Student.findOne({ identityDocument });

        if (existsId) {
            return res.status(400).json({
                ok: false,
                msg: 'El estudiante con ese ID ya está registrado'
            });
        }

        const student = new Student({
            password: id,
            ...req.body
        });

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        student.password = bcrypt.hashSync(student.password, salt);

        const studentDB = await student.save();


        res.json({
            ok: true,
            student: studentDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const updateStudent = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'updateStudent'
    });
};

const deleteStudent = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'deleteStudent'
    });
};


module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent
};