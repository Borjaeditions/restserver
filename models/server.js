const express = require('express');
const cors = require('cors');
const colors = require('colors');
const { dbconexion } = require('../db/config');
class Server{

    constructor(){

        this.app = express();
        this.puerto = process.env.PORT;
        this.rutaAPI = '/api/usuarios';

        //conectar a base de datos

        this.conectarDB();

        //Middlwares
        this.middlewares();    

        //rutas de mi aplicación || My application's routes
        this.routes();


    }
    async conectarDB(){

        await dbconexion();

    }
    middlewares(){

        this.app.use(express.static('public'));

        //recibir datos con json 
        this.app.use(express.json());

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