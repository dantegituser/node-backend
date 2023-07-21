const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');



class Server{
constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    //conectar a base de datos
    this.conectarDB();

    //middlewares
    this.middlewares();

    //rutas de la aplicacion
    this.routes();
}

async conectarDB(){
    await dbConnection();
}

routes(){
    
    this.app.use(this.usuariosPath, require('../routes/user'));
    
}

middlewares(){
    //CORS
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json());

    // directorio publico
    this.app.use(express.static('public'));

}

listen(){
    this.app.listen(this.port, () => {
    console.log('Corriendo en puerto', this.port);
});
}
}

module.exports = Server;