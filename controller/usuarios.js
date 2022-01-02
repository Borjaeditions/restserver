//Sólo es para que aparezca el tipo de dato
const {response, query} = require('express');
const { json } = require('express/lib/response');

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

const usuariosPost = (req, res, next)=>{

    const body = req.body;

    res.json({

        ok: true,
        msg: 'post a API - controlador',
        body
    });
    console.log(JSON.stringify(body).cyan);
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