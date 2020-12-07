const { response } = require('express');
const bcrypt = require('bcryptjs');

const Admin = require('../models/admin');



const getAdmins = async(req, res) => {

    const admins = await Admin.find({}, 'username password');

    res.json({
        ok: true,
        admins
    });
};

const createAdmin = async(req, res = response) => {

    const { username, password } = req.body;



    try {

        const existeUsername = await Admin.findOne({ username });

        if (existeUsername) {
            return res.status(400).json({
                ok: false,
                msg: 'El username ya existe'
            });
        }

        const admin = new Admin(req.body);

        const salt = bcrypt.genSaltSync();
        admin.password = bcrypt.hashSync(password, salt);

        await admin.save();

        res.json({
            ok: true,
            admin
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
    getAdmins,
    createAdmin,
};