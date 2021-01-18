/*
    Ruta: /api/enrollments
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { getEnrollments, createEnrollment } = require('../controllers/enrollments');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getEnrollments);

router.post('/', [
        validateJWT,
        check('enrollmentYear', 'El año es obligatorio').not().isEmpty(),
        check('group', 'El group id debe de ser válido').isMongoId(),
        check('student', 'El student id debe de ser válido').isMongoId(),
        validateFields,
    ],
    createEnrollment
);


module.exports = router;