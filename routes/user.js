

const {Router} = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../midllewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos
],usuariosPut);

    router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio y mas de 6 letras').not().isEmpty().isLength({min:6}),
        // check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(emailExiste),
        //check('role', 'No es un role permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('role').custom(esRoleValido),
        validarCampos
    ], usuariosPost);
    router.patch('/', usuariosPatch);

    router.delete('/:id', [
        check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
    ],usuariosDelete);


module.exports = router;