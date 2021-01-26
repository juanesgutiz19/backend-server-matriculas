/*
    Ruta: /api/degrees
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');


const { validateJWT } = require('../middlewares/validate-jwt');


const {
    createDegree,
    getDegrees,
    updateDegree,
    getDegreeByName
} = require('../controllers/degrees');


const router = Router();

router.get('/', validateJWT, getDegrees);

router.get('/:name', validateJWT, getDegreeByName);

router.post('/', [
        validateJWT
    ],
    createDegree
);

router.put('/:id', [
        validateJWT,
        check('degree', 'El nombre del grado es obligatorio').not().isEmpty(),
        check('subjects', 'Las materias del grado son obligatorias').not().isEmpty(),
        validateFields
    ],
    updateDegree
);

module.exports = router;