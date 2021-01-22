const { response } = require('express');

const Group = require('../models/group');

const getGroups = async(req, res = response) => {

    const groups = await Group.find()
        .populate('degree', 'degree subjects');

    res.json({
        ok: true,
        groups
    });
};


const getGroupById = async(req, res = response) => {

    const id = req.params.id;

    let group = await Group.findById(id)
    if (!group) {
        return res.status(404).json({
            ok: true,
            msg: 'Grupo no encontrado por id',
        });
    }

    group = await Group.findById(id)
        .populate('degree', 'degree subjects');

    res.json({
        ok: true,
        group
    });
};

const getGroupsDegree = async(req, res = response) => {


    const degree = req.params.id;

    const groups = await Group.find({ degree })
        .populate('degree', 'degree subjects');

    res.json({
        ok: true,
        groups
    });
};


const createGroup = async(req, res = response) => {

    const group = new Group(
        req.body
    );

    try {
        const groupdDB = await group.save();


        res.json({
            ok: true,
            group: groupdDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const deleteGroup = async(req, res = response) => {

    const id = req.params.id;

    try {

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({
                ok: true,
                msg: 'Grupo no encontrado por id',
            });
        }

        await Group.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'Grupo eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const updateGroup = async(req, res = response) => {

    const groupId = req.params.id;

    try {

        const groupDB = await Group.findById(groupId);

        if (!groupDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un grupo con ese id'
            });
        }

        // Actualizaciones
        const updatedGroup = await Group.findByIdAndUpdate(groupId, req.body, { new: true });

        res.json({
            ok: true,
            group: updatedGroup
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        });
    }
};

module.exports = {
    getGroups,
    createGroup,
    deleteGroup,
    updateGroup,
    getGroupById,
    getGroupsDegree
};