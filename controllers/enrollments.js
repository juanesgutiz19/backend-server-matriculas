const { response } = require('express');
const bcrypt = require('bcryptjs');

const Enrollment = require('../models/enrollment');
const Group = require('../models/group');

const { generateJWT } = require('../helpers/jwt');

const getEnrollments = async(req, res) => {

    //Degree
    const enrollments = await Enrollment.find()
        .populate('group', 'degree mainTeacher')
        .populate('student', 'identityDocument fullName');

    res.json({
        ok: true,
        enrollments
    });
};

//PENDIENTE
const getEnrollmentsStudent = async(req, res) => {

    const student = req.params.id;

    //Degree
    const enrollments = await Enrollment.find({ student })
        .populate('group', 'degree');
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

// Borrar matrícula de un estudiante por id
const deleteEnrollmentStudent = async(req, res = response) => {

    const student = req.params.id;

    try {

        // Esto se pone por si se manda un id que no es válido de mongo, la aplicación no tire error.
        if (student.match(/^[0-9a-fA-F]{24}$/)) {
            const enrollment = await Enrollment.findOne({ student });

            if (!enrollment) {
                return res.status(404).json({
                    ok: true,
                    msg: 'Estudiante con ese id no está matriculado',
                });
            }

            await Enrollment.findOneAndRemove({ student });


            res.json({
                ok: true,
                msg: 'Matrícula eliminada'
            });
        } else {
            return res.status(404).json({
                ok: true,
                msg: 'El id ingresado no es válido para mongo',
            });
        }



    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};


const getAvailableQuotaInGroup = async(req, res = response) => {
    const group = req.params.id;
    const currentTime = new Date();
    const actualYear = currentTime.getFullYear();
    const total = await
    Enrollment.countDocuments({ enrollmentYear: actualYear, group });
    let groupDB = await Group.findById(group);
    let quota = groupDB.quota;
    const availableQuota = quota - total;
    res.json({
        ok: true,
        availableQuota
    });
};

const getStudentsPerDayShift = async(req, res) => {

    const currentDate = new Date();
    const actualYear = currentDate.getFullYear();

    const enrollments = await Enrollment.find({ enrollmentYear: actualYear })
        .populate('group', 'degree mainTeacher dayShift')
        .populate('student', 'identityDocument fullName');


    res.json({
        ok: true,
        enrollments
    });
};


module.exports = {
    createEnrollment,
    deleteEnrollmentStudent,
    getAvailableQuotaInGroup,
    getStudentsPerDayShift,
    getEnrollments,
    getEnrollmentsStudent
};