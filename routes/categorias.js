const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../midllewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

//obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// crear middleware para validar el id

//obtener una categoria por id
router.get('/:id', [
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria);

//crear nueva categoria - privado- cualquier role, token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//actualizar - privado- cualquier role, token valido
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatoro').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);


//borrar catgoria  - privado- cualquier solo admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo').isMongoId(),
check('id').custom(existeCategoriaPorId),
validarCampos
] ,borrarCategoria);






module.exports = router;