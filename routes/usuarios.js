const {Router} = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { check } = require('express-validator');
// const {validarCampos} = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { validarRoles, tieneRole } = require('../middlewares/validar-roles');
const {validarCampos, validarJWT, tieneRole, validarRoles} = require('../middlewares/index')


const router = Router();

router.get('/', usuariosGet)

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosPut)

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser más de 6 letras').isLength({min:6}),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( emailExiste ),
        // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom( esRoleValido ),
        validarCampos
], usuariosPost)

router.delete('/:id', [
    validarJWT,
    // validarRoles,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'OTROS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router