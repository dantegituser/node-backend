const { response } = require("express");

const esAdminRole = (req, res= response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar rol sin verificar el token primero'
        });
    }

    const {role, nombre} = req.usuario;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - no puede hacer esto`
        });
    }

next();
};

const tieneRole = (...roles) => {

    return (req, res = response, next) => {
        
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar rol sin verificar el token primero'
        });
    }

    if(!roles.includes(req.usuario.role)){
        return res.status(401).json({
            msg: `el servicio requiere uno de estos role : ${roles}`
        });
    }

        
        next();

    };

};


module.exports = {
    esAdminRole,
    tieneRole
};