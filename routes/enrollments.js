/*
    Ruta: /api/enrollments
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { getEnrollments, createEnrollment, deleteEnrollmentStudent, getAvailableQuotaInGroup, getStudentsPerDayShift, getEnrollmentsStudent } = require('../controllers/enrollments');
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

router.delete('/:id', [
        validateJWT
    ],
    deleteEnrollmentStudent
);

router.get('/studentEnrollments/:id', validateJWT, getEnrollmentsStudent);

router.get('/perDayShift', validateJWT, getStudentsPerDayShift);

router.get('/:id', validateJWT, getAvailableQuotaInGroup);

module.exports = router;