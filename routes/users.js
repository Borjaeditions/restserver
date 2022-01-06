const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controller/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);
//el check prepara la validación del correo para que el controlador reciba como un argumento en el request, tambiénn tratado como req
//manda los errores en forma de arreglo, por lo que será necesario seleccionar cada uno de los mismos
router.post('/', [
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('password', "La contraseña es obligatorio y más de 6 letras").isLength({min: 6}),
    //check('password', "la contraseña debe contener un caracter especial").matches( "1234567890abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ!$#%/()=?¡+" ),
    check('correo', "EL correo no es valido").isEmail(),
    check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE'])
],
validarCampos,
usuariosPost);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;
