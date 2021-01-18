/*
    Ruta: /api/degrees
*/

const { Router } = require('express');
/*
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
*/

const { createDegree } = require('../controllers/degrees');
// const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// router.get('/', validateJWT, getAdmins);

router.post('/',
    createDegree
);


module.exports = router;