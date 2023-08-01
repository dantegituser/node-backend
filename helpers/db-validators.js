const {Role, Usuario, Categoria, Producto} = require('../models');

// const Role = require('../models/role');
// const Usuario = require('../models/usuario');

const esRoleValido = async(role='') => {
            const existeRole = await Role.findOne({role});
            if(!existeRole){
                throw new Error(`El role ${role} no está registrado en la base de datos`);
            }
        };

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
            throw new Error(`El correo ${correo} ya está registrado`)
    }
};

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
            throw new Error(`El id ${id} no existe`);
    }
};

const existeCategoriaPorId = async(id) => {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
            throw new Error(`La categoría con  id ${id} no existe`);
    }
};

const existeProductoPorId = async(id) => {
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
            throw new Error(`El producto con  id ${id} no existe`);
    }
};

// validar colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);

    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida`);
    }

    return true;
};

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
};