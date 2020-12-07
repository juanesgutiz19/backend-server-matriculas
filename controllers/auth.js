const { response } = require('express');
const bcrypt = require('bcryptjs');

const Admin = require('../models/admin');
const { generateJWT } = require('../helpers/jwt');
const login = async(req, res = response) => {

    const { username, password } = req.body;

    try {


        // Verificar username


        const adminDB = await Admin.findOne({ username });

        if (!adminDB) {
            return res.status(404).json({
                ok: false,
                msg: 'username no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, adminDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        const token = await generateJWT(adminDB._id);

        res.json({
            ok: true,
            token
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
    login
};