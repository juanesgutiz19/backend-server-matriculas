const { response } = require('express');
const bcrypt = require('bcryptjs');

const Admin = require('../models/admin');
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

        res.json({
            ok: true,
            msg: 'Hola mundo'
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