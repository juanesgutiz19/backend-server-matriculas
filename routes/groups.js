/*
    Ruta: /api/groups
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { getGroups, createGroup } = require('../controllers/groups');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getGroups);

router.post('/', [
        validateJWT,
        check('mainTeacher', 'El profesor es obligatorio').not().isEmpty(),
        check('dayShift', 'La jornada es obligatoria').not().isEmpty(),
        check('degree', 'El degree id debe de ser válido').isMongoId(),
        validateFields,
    ],
    createGroup
);


module.exports = router;