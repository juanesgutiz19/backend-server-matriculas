const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');

const fileUpload = (req, res = response) => {

    const id = req.params.id;
    const students = req.params.students;

    if (students !== 'students') {
        return res.status(400).json({
            ok: false,
            msg: 'No es un estudiante'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    const file = req.files.image;

    const splittedName = file.name.split('.');
    const fileExtension = splittedName[splittedName.length - 1];

    // Validar extension
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtensions.includes(fileExtension)) {
        return res.status(400).json({
            ok: false,
            msg: 'Solo se permiten extensiones .png, .jpg, .jpeg y .gif'
        });
    }

    // Generar el nombre del archivo
    const fileName = `${ uuidv4() }.${ fileExtension }`;

    // Path para guardar la imagen
    const path = `./uploads/students/${ fileName }`;

    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos
        updateImage(id, fileName);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            fileName
        });
    });
};

const getImage = (req, res = response) => {

    const picture = req.params.image;

    const pathImg = path.join(__dirname, `../uploads/students/${ picture }`);

    // imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
};

module.exports = {
    fileUpload,
    getImage
};