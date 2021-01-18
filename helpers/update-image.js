const Student = require('../models/student');
const fs = require('fs');

const deleteImage = (path) => {
    if (fs.existsSync(path)) {
        // borrar la imagen anterior
        fs.unlinkSync(path);
    }
};

const updateImage = async(id, nombreArchivo) => {


    let oldPath = '';

    const student = await Student.findById(id);
    if (!student) {
        console.log('No es un estudiante por id');
        return false;
    }

    oldPath = `./uploads/students/${ student.img }`;
    deleteImage(oldPath);

    student.img = nombreArchivo;
    await student.save();
    return true;
};

module.exports = {
    updateImage
};