//Sólo es para que aparezca el tipo de dato
const {response} = require('express');

const usuariosGet = (req, res, next)=>{

    res.json({

        ok: true,
        msg: 'Get a API - controlador'

    });
}

const usuariosPost = (req, res, next)=>{

    res.json({

        ok: true,
        msg: 'post a API - controlador'

    });
}
const usuariosPut = (req, res, next)=>{

    res.json({

        ok: true,
        msg: 'put a API - controlador'

    });

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