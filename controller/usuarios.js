const bcryptjs = require('bcryptjs');
//Sólo es para que aparezca el tipo de dato
const {response, query} = require('express');
const Usuario = require('../models/usuarios');
const {findOne} = require('mongoose');
const { validationResult } = require('express-validator');


const usuariosGet = (req, res, next)=>{

    //query permite conocer los parametros que se estén mandando a través del link, se puede separar cada parámetro o asingar algún valor en especifico si el espacio viene vacio

    const {q, nombre, apikey } = req.query;

    res.json({

        ok: true,
        msg: 'Get a API - controlador',
        q,
        nombre,
        apikey

    });
    console.log(nombre);
}

const usuariosPost = async (req, res, next)=>{

    //los errores vienen del middleware que esta entre la ruta y el controlador
    errores = validationResult(req);
    //ValidationResult no regresa nada si no hay algún error, por eso se utiliza isEmpity para conocer que el parametro errores este vacio
    
    //No veo si haya alguna manera de obtener algún dato "errores" pero sí con req.body
    //Actualización de la linea anterior: Para poder obtener los erroes del json que retorna 'errores', se requiere seleccionar el indice con corchetes [] y el número de indice
    //los inidices empiezan en 0
    console.log(errores.errors[0].msg.cyan)
    if (!errores.isEmpty()){
                
        let mensajeArray = [];
        task = errores.errors;
        //console.log(task);
        task.forEach(element => {
            console.log(element.msg);
            mensajeArray.push(element.msg);
            console.log(mensajeArray);
            //mensajeArray = mensajeArray + `${element.msg} `;
            //console.log(task[element]);
        });
        console.log(mensajeArray[1].yellow);

        console.log("Correo no valido".red, req.body.correo.yellow);
        return res.status(400).json({

            msgs: mensajeArray,
            correo: req.body.correo,

        });

    }
       
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar si el correo existe

    const ExisteCorreo = await Usuario.findOne({correo});
    if (ExisteCorreo) {
     
        return res.status(400).json({

            msg: "El correo ya esta registrado "

        });

    }   
    

    //Encriptar contraseña

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);
    //guardar en base de datos

    await usuario.save();

    res.json({

        ok: true,
        msg: 'post a API - controlador',
        usuario
    });
    //console.log(JSON.stringify(body).cyan);
}
const usuariosPut = (req, res, next)=>{

    //req.params.id es un valor dinamico de la url 
    const id = req.params.id;

    res.json({

        ok: true,
        msg: 'put a API - controlador',
        id

    });
    console.log(id);    

}
const usuariosDelete = (req, res, next)=>{

    res.json({

        ok: true,
        msg: 'delete a API - controlador'

    });

}

module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete

}