/*
    Path: '/api/login'
*/

const { Router } = require('express');
const { login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/', [
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validateFields,
    ],
    login
);

router.get('/renew',
    validateJWT,
    renewToken
);

module.exports = router;