const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controller/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);
//el check prepara la validación del correo para que el controlador reciba como un argumento en el request, tambiénn tratado como req
//manda los errores en forma de arreglo, por lo que será necesario seleccionar cada uno de los mismos
router.post('/', [
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('password', "El pasword es obligatorio y más de 6 letras").isLength({min: 6}),
    check('correo', "EL correo no es valido").isEmail(),
    check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE'])
]
    ,usuariosPost);
router.delete('/', usuariosDelete);

module.exports = router;
