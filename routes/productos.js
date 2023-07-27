const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../midllewares');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');

const { existeCategoriaPorId } = require('../helpers/db-validators');
const { existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

//obtener todas las categorias - publico
router.get('/', obtenerProductos);

// crear middleware para validar el id

//obtener una Producto por id
router.get('/:id', [
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProducto);

//crear nueva Producto - privado- cualquier role, token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es ID valido de mongo').isMongoId(),
    check('categoria', 'La categoria es obligatoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

//actualizar - privado- cualquier role, token valido
router.put('/:id',[
    validarJWT,
    // check('categoria', 'No es ID valido de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);


//borrar catgoria  - privado- cualquier solo admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo').isMongoId(),
check('id').custom(existeProductoPorId),
validarCampos
] ,borrarProducto);






module.exports = router;