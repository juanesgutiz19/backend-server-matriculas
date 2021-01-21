const { response } = require('express');
const bcrypt = require('bcryptjs');

const Enrollment = require('../models/enrollment');
const Degree = require('../models/degree');

const { generateJWT } = require('../helpers/jwt');


const getEnrollments = async(req, res) => {

    //Degree
    const enrollments = await Enrollment.find()
        .populate('group', 'degree mainTeacher')
        .populate('student', 'identityDocument fullName');


    console.log(enrollments);
    res.json({
        ok: true,
        enrollments
    });
};

const createEnrollment = async(req, res = response) => {

    try {
        const enrollment = new Enrollment(req.body);

        await enrollment.save();

        res.json({
            ok: true,
            enrollment
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
    getEnrollments,
    createEnrollment,
};