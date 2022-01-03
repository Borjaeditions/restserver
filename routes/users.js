const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controller/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);
//el check prepara la validación del correo para que el controlador reciba como un argumento en el request, tambiénn tratado como req
router.post('/', [check('correo', "EL correo no es valido").isEmail(),] ,usuariosPost);
router.delete('/', usuariosDelete);

module.exports = router;
