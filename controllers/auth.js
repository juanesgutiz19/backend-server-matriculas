const { response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');

const Student = require('../models/student');
const { generateJWT } = require('../helpers/jwt');
const login = async(req, res = response) => {

    const { username, password } = req.body;

    try {

        let tipoUsuario = '';

        let userDB = await Admin.findOne({ username });


        if (!userDB) {
            const identityDocument = username;
            userDB = await Student.findOne({ identityDocument });
            if (!userDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'username no encontrado'
                });
            } else {
                tipoUsuario = 'Student';
            }
        } else {
            tipoUsuario = 'Admin';
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }


        const token = await generateJWT(userDB._id);

        res.json({
            ok: true,
            token,
            tipoUsuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const renewToken = async(req, res = response) => {


    const id = req.uid;

    // Generar el TOKEN - JWT
    const token = await generateJWT(id);

    let user = await Admin.findById(id);
    if (!user) {
        user = await Student.findById(id);
    }

    res.json({
        ok: true,
        token,
        user
    });

};

module.exports = {
    login,
    renewToken
};