const { check } = require('express-validator');
const {Router} = require('express');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/login',[
    check('correo', 'El correo debe ser obligatorio' ).isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login)


module.exports = router;