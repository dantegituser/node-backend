const { response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async(req = request,res = response) => {

    const {limite=5, desde=0} = req.query;
    // const usuarios = await Usuario.find({estado:true})
    // .skip(desde)
    // .limit(limite);

    // const total = await Usuario.countDocuments({estado:true});

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
    .skip(desde)
    .limit(limite)
    ]);

    res.json({
        // resp
        total,usuarios
    });
};
const usuariosPost = async (req,res = response) => {

    const {nombre,correo,password, role} = req.body;
    const usuario = new Usuario({
        nombre, correo, password, role
    });
    // verificar si correo existe
    // const existeEmail = await Usuario.findOne({correo});
    // if(existeEmail){
    //     return res.status(400).json({
    //         msg:'Ese correo ya está registrado'
    //     });
    // }

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // gusrdar en db
    await usuario.save();


    // const {nombre, edad} = req.body;
    res.json({
        usuario
    });
};

const usuariosPut = async(req,res = response) => {
    const id = req.params.id;
    const {_id,password, google, correo, ...resto} = req.body;

    // validar contra base de datos
    if(password){
        //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
};


const usuariosPatch = (req,res = response) => {
    res.json({
        msg:'patch API - controlador'
    });
};
const usuariosDelete = async(req,res = response) => {

    const {id} = req.params;

    // borrarolo fisicmante
    // const usuario = await Usuario.findByIdAndDelete(id);
    
    //borrar modificando el estado
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});


    res.json(usuario);
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}