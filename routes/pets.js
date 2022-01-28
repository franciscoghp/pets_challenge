
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { petsGet,
        petsPut,
        petsPost,
        petsDelete } = require('../controllers/pet');

const router = Router();


router.get('/:owner_id', petsGet );

router.post('/', petsPost );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],petsPut );

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],petsDelete );

module.exports = router;