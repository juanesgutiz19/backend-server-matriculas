const Admin = require('../models/admin');


const getAdmins = (req, res) => {

    res.json({
        ok: true,
        mdg: 'get admins'
    });
};

const createAdmin = async(req, res) => {

    const { username, password } = req.body;

    const usuario = new Admin(req.body);

    await usuario.save();

    res.json({
        ok: true,
        usuario
    });
};

module.exports = {
    getAdmins,
    createAdmin,
};