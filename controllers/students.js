const { response } = require('express');
const bcrypt = require('bcryptjs');

const Student = require('../models/student');
const Enrollment = require('../models/enrollment');

const getStudents = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [students, total] = await Promise.all([
        Student
        .find({}, 'identityDocument fullName age address email contactNumber guardianName guardianContactNumber lastApprovedGrade img')
        .skip(desde)
        .limit(5),

        Student.countDocuments()
    ]);

    res.json({
        ok: true,
        students,
        total
    });
};

const createStudent = async(req, res = response) => {

    const { identityDocument, email } = req.body;
    const id = identityDocument;
    const studentEmail = email;

    try {

        const existsId = await Student.findOne({ identityDocument });

        if (existsId) {
            return res.status(400).json({
                ok: false,
                msg: 'El estudiante con ese ID ya está registrado'
            });
        }

        const existsEmail = await Student.findOne({ email });

        if (existsEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El estudiante con ese correo electrónico ya está registrado'
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

const updateStudent = async(req, res = response) => {

    const studentId = req.params.id;

    try {

        const studentDB = await Student.findById(studentId);

        if (!studentDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un estudiante con ese id'
            });
        }

        // Actualizaciones
        const { identityDocument, email, password, ...fields } = req.body;

        if (studentDB.email !== email) {

            const existsEmail = await Student.findOne({ email });
            if (existsEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        if (studentDB.identityDocument !== identityDocument) {

            const existsId = await Student.findOne({ identityDocument });
            if (existsId) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con esa identificación'
                });
            }
        }


        fields.identityDocument = identityDocument;
        fields.email = email;

        const salt = bcrypt.genSaltSync();
        if (fields.password != undefined) {
            fields.password = bcrypt.hashSync(password, salt);
        }

        const updatedStudent = await Student.findByIdAndUpdate(studentId, fields, { new: true });

        res.json({
            ok: true,
            usuario: updatedStudent
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};

const deleteStudent = async(req, res = response) => {

    const studentId = req.params.id;

    try {

        const studentDB = await Student.findById(studentId);

        if (!studentDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        const student = studentId;

        const enrollmentDB = await Enrollment.find({ student });

        if (enrollmentDB) {
            await Enrollment.deleteMany({ student });
        }

        await Student.findByIdAndDelete(studentId);

        res.json({
            ok: true,
            msg: 'Estudiante eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

};


module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent
};