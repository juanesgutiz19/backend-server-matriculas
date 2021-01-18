/*
    ruta: api/todo/
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getCollectionDocuments } = require('../controllers/searches');


const router = Router();

router.get('/collection/:table/:search', validateJWT, getCollectionDocuments);

module.exports = router;