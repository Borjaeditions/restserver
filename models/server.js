const express = require('express');
const cors = require('cors');
const colors = require('colors');
class Server{

    constructor(){

        this.app = express();
        this.puerto = process.env.PORT;
        this.rutaAPI = '/api/usuarios';

        //Middlwares
        this.middlewares();    

        //rutas de mi aplicación || My application's routes
        this.routes();


    }
    middlewares(){

        this.app.use(express.static('public'));
        this.app.use(cors());         

    }

    routes(){

        this.app.use(this.rutaAPI, require('../routes/users'));

    }
    listen(){

        this.app.listen(this.puerto, ()=>{
            
            console.log(`Servidor iniciado en puerto:`.yellow, `${this.puerto}`.underline.cyan);
            console.log('status:'.yellow, 'OK'.green);

        });

    }

}

module.exports = Server;