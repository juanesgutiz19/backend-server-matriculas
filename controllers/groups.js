const { response } = require('express');

const Group = require('../models/group');

const getGroups = async(req, res = response) => {

    const groups = await Group.find()
        .populate('degree', 'degree quota subjects');

    res.json({
        ok: true,
        groups
    });
}

const createGroup = async(req, res = response) => {

    const group = new Group(
        req.body
    );

    try {
        const groupdDB = await group.save();


        res.json({
            ok: true,
            group: groupdDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};

module.exports = {
    getGroups,
    createGroup
};