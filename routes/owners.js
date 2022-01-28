
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { ownersGet,
        ownersPut,
        ownersPost,
        ownersDelete } = require('../controllers/owner');

const router = Router();

router.get('/', ownersGet );

router.post('/', ownersPost );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],ownersPut );

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],ownersDelete );

module.exports = router;