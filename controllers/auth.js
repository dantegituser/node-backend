const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req,res = response) => {

    const {correo, password} = req.body;

    try {

    // verificar si email existe
    const usuario = await Usuario.findOne({correo});
    if(!usuario){
        return res.status(400).json({
            msg: 'Usuario / password no son correctos - correo'
        });
    }
    //si el usauario esta activo
    if(!usuario.estado){
        return res.status(400).json({
            msg: 'Usuario / password no son correctos - estado:false'
        });
    }
    
    //verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if(!validPassword){
        return res.status(400).json({
            msg: 'Usuario / password no son correctos - password'
        });

    }

    // generar el JWT
    const token= await generarJWT(usuario.id);


    res.json({
        usuario, token
    });
    } catch (error) {
        console.log(error);
    res.status(500).json({
    msg:'Hable con el administrador'
        });
    }


};

const googleSignIn = async(req, res = response) => {

    const {id_token} = req.body;

    try {
        const {correo, nombre, img} = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({correo});
        if(!usuario){
            // crear usuario
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true,
                role:'USER_ROLE'
            };
            usuario = new Usuario(data);
            const usuariolog = await usuario.save();
        }

        // si el suauio en db esta en false denegar
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario bloqueado, hable con el administrador'
            });
        }

        // generar el jwt
        const token = await generarJWT(usuario.id);

        res.json({
            token,
            usuario
        });

        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar',
        });
    }


};

module.exports = {
    login,
    googleSignIn
};