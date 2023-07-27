const existeCategoria = async(nombre) => {
    const existeCategoria = await Usuario.findOne({nombre});
    if(existeCategoria){
            throw new Error(`La categoria ${existeCategoria.nombre} ya existe`);
    }
};

module.exports = {
    existeCategoria
};