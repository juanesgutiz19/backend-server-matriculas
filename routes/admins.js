/*
    Ruta: /api/admins
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { getAdmins, createAdmin } = require('../controllers/admins');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getAdmins);

router.post('/', [
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validateFields,
    ],
    createAdmin
);


module.exports = router;