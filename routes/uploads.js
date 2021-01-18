/*

    ruta: api/upload/
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');


const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload, getImage } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());

router.put('/:students/:id', validateJWT, fileUpload);
router.get('/:students/:image', getImage);

module.exports = router;