const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');



class Server{
constructor(){
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
        auth: '/api/auth',
        buscar: '/api/buscar',
        usuarios: '/api/usuarios',
        categorias: '/api/categorias',
        productos: '/api/productos',
        uploads: '/api/uploads'
    };

    // this.usuariosPath = '/api/usuarios';
    // this.authPath = '/api/auth';

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
    
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.buscar, require('../routes/buscar'));
    this.app.use(this.paths.usuarios, require('../routes/user'));
    this.app.use(this.paths.productos, require('../routes/productos'));
    this.app.use(this.paths.categorias, require('../routes/categorias'));
    this.app.use(this.paths.uploads, require('../routes/uploads'));
    
}

middlewares(){
    //CORS
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json());

    // directorio publico
    this.app.use(express.static('public'));

    // File upload 
    this.app.use(fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true
    }));

}

listen(){
    this.app.listen(this.port, () => {
    console.log('Corriendo en puerto', this.port);
});
}
}

module.exports = Server;