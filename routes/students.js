/*  
    Hospitales
    ruta: /api/students
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent
} = require('../controllers/students');


const router = Router();

router.get('/', getStudents);

router.post('/', [
        validateJWT,
        check('identityDocument', 'El documento es obligatorio').not().isEmpty(),
        check('fullName', 'El nombre es obligatorio').not().isEmpty(),
        check('age', 'La edad es obligatoria').not().isEmpty(),
        check('address', 'La dirección es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('contactNumber', 'El número de contacto es obligatorio').not().isEmpty(),
        check('guardianName', 'El nombre de acudiente es obligatorio').not().isEmpty(),
        check('guardianContactNumber', 'El teléfono del acudiente es obligatorio').not().isEmpty(),
        check('lastApprovedGrade', 'El último grado aprobado es obligatorio').not().isEmpty(),
        validateFields
    ],
    createStudent
);

router.put('/:id', [
        validateJWT,
        check('identityDocument', 'El documento es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('fullName', 'El nombre es obligatorio').not().isEmpty(),
        check('age', 'La edad es obligatoria').not().isEmpty(),
        check('address', 'La dirección es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('contactNumber', 'El número de contacto es obligatorio').not().isEmpty(),
        check('guardianName', 'El nombre de acudiente es obligatorio').not().isEmpty(),
        check('guardianContactNumber', 'El teléfono del acudiente es obligatorio').not().isEmpty(),
        check('lastApprovedGrade', 'El último grado aprobado es obligatorio').not().isEmpty(),
        validateFields
    ],
    updateStudent
);

router.delete('/:id',
    validateJWT,
    deleteStudent
);



module.exports = router;