/*
    Ruta: /api/groups
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { getGroups, createGroup, deleteGroup, updateGroup, getGroupById, getGroupsDegree } = require('../controllers/groups');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getGroups);

router.get('/degree/:id', validateJWT, getGroupsDegree);

router.get('/:id', validateJWT, getGroupById);

router.post('/', [
        validateJWT,
        check('mainTeacher', 'El profesor es obligatorio').not().isEmpty(),
        check('dayShift', 'La jornada es obligatoria').not().isEmpty(),
        check('degree', 'El degree id debe de ser válido').isMongoId(),
        validateFields,
    ],
    createGroup
);

router.delete('/:id',
    validateJWT,
    deleteGroup
);

router.put('/:id', [
        validateJWT,
        check('mainTeacher', 'El nombre del profesor es obligatorio').not().isEmpty(),
        check('dayShift', 'La jornada es obligatoria').not().isEmpty(),
        check('quota', 'El número de cupos es obligatorio').not().isEmpty(),
        validateFields
    ],
    updateGroup
);


module.exports = router;