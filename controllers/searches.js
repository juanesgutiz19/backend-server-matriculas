const { response } = require('express');

const Student = require('../models/student');


const getCollectionDocuments = async(req, res = response) => {

    const table = req.params.table;
    const search = req.params.search;
    const regex = new RegExp(search, 'i');

    let data = [];

    /* Se hizo así por si a futuro también se deciden buscar administradores.*/
    switch (table) {
        case 'students':
            data = await Student.find({
                identityDocument: regex
            });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser students'
            });
    }

    res.json({
        ok: true,
        results: data
    });

}

module.exports = {
    getCollectionDocuments
};