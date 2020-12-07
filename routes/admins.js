/*
    Ruta: /api/admins
*/

const { Router } = require('express');
const { getAdmins, createAdmin } = require('../controllers/admins');


const router = Router();



router.get('/', getAdmins);

router.post('/', createAdmin);






module.exports = router;